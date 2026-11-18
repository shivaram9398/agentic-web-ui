import type { MessageKey } from '../../i18n/messages'
import LanguagePicker from '../../i18n/LanguagePicker'
import { useLocale } from '../../i18n/locale-context'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'

import { authErrorKey, isSignedIn, register, signIn } from './auth'
import './auth.css'

export default function AuthPage() {
  const { pathname } = useLocation()
  return isSignedIn() ? (
    <Navigate to="/" replace />
  ) : (
    <AuthForm
      key={pathname}
      registering={pathname.replace(/\/+$/, '').toLowerCase() === '/register'}
    />
  )
}

function AuthForm({ registering }: { registering: boolean }) {
  const { t } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { email?: string; registered?: boolean; returnTo?: string } | null
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<MessageKey | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const form = event.currentTarget
    const invalid = form.querySelector<HTMLInputElement>('input:invalid')
    if (invalid) {
      const validationKey = {
        name: 'registration.yourName',
        email: 'auth.invalidEmail',
        password: 'login.enterPassword',
      } as const
      setError(validationKey[invalid.name as keyof typeof validationKey])
      invalid.focus()
      return
    }

    const values = new FormData(form)
    const email = values.get('email')
    const password = values.get('password')
    const name = values.get('name')
    if (typeof email !== 'string' || typeof password !== 'string') return

    setError(null)
    setPending(true)
    try {
      if (registering) {
        await register({
          name: typeof name === 'string' ? name.trim() : '',
          email: email.trim(),
          password,
        })
        void navigate('/login', {
          replace: true,
          state: { email, registered: true, returnTo: state?.returnTo },
        })
      } else {
        await signIn({ email: email.trim(), password })
        void navigate(state?.returnTo ?? '/', { replace: true })
      }
    } catch (failure) {
      setError(authErrorKey(failure, registering))
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-intro" aria-label="Agentic Meetings Manager">
        <div className="auth-brand">
          <span className="auth-brand-mark" aria-hidden="true">
            ✳
          </span>{' '}
          Agentic Meetings
        </div>
        <div className="auth-intro-copy">
          <p className="auth-tagline">{t('auth.tagline')}</p>
          <p>{t('auth.intro')}</p>
        </div>
        <div className="auth-art" aria-hidden="true">
          <div className="auth-art-card">
            <div className="auth-art-header">
              <span />
              <span />
              <span />
            </div>
            <div className="auth-art-line" />
            <div className="auth-art-grid">
              {Array.from({ length: 15 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="auth-content" aria-labelledby="auth-title">
        <div className="auth-form-wrap">
          <LanguagePicker />
          <h1 id="auth-title">{registering ? t('registration.createTitle') : t('login.signIn')}</h1>
          <p className="auth-description">
            {registering ? t('registration.getStarted') : t('login.signInIntro')}
          </p>
          {!registering && state?.registered && (
            <p className="auth-notice" role="status">
              {t('login.registered')}
            </p>
          )}
          <form noValidate onSubmit={(event) => void submit(event)} aria-busy={pending}>
            <fieldset disabled={pending}>
              {registering && (
                <label className="auth-field">
                  {t('registration.name')}
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    pattern=".*\S.*"
                    placeholder={t('registration.yourName')}
                  />
                </label>
              )}
              <label className="auth-field">
                {t('auth.email')}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  defaultValue={state?.email}
                />
              </label>
              <div className="auth-field">
                <label htmlFor="auth-password">{t('auth.password')}</label>
                <div className="auth-password">
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={registering ? 'new-password' : 'current-password'}
                    required
                    placeholder={
                      registering ? t('registration.newPassword') : t('login.enterPassword')
                    }
                  />
                  <button
                    type="button"
                    aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {t(showPassword ? 'auth.hide' : 'auth.show')}
                  </button>
                </div>
              </div>
              {error && (
                <p className="auth-error" role="alert">
                  {t(error)}
                </p>
              )}
              <button className="auth-submit" type="submit">
                {pending
                  ? registering
                    ? t('registration.creating')
                    : t('login.signingIn')
                  : registering
                    ? t('registration.create')
                    : t('login.signIn')}
              </button>
            </fieldset>
          </form>
          <p className="auth-switch">
            {registering ? t('registration.existing') : t('login.newUser')}{' '}
            <Link to={registering ? '/login' : '/register'} state={{ returnTo: state?.returnTo }}>
              {registering ? t('login.signIn') : t('login.createLink')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
