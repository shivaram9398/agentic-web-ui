import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'
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
    <Box component="main" className="auth-shell">
      <Box component="section" className="auth-intro" aria-label="Agentic Meetings Manager">
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
      </Box>

      <Box component="section" className="auth-content" aria-labelledby="auth-title">
        <div className="auth-form-wrap">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <LanguagePicker />
          </Box>
          <Typography component="h1" id="auth-title">
            {registering ? t('registration.createTitle') : t('login.signIn')}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            {registering ? t('registration.getStarted') : t('login.signInIntro')}
          </Typography>
          {!registering && state?.registered && (
            <Alert severity="success" role="status" sx={{ mb: 2 }}>
              {t('login.registered')}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={(event) => void submit(event)}
            aria-busy={pending}
          >
            <Box
              component="fieldset"
              disabled={pending}
              sx={{ display: 'grid', gap: 2, border: 0, p: 0, m: 0, minWidth: 0 }}
            >
              {registering && (
                <TextField
                  id="auth-name"
                  name="name"
                  label={t('registration.name')}
                  autoComplete="name"
                  disabled={pending}
                  required
                  placeholder={t('registration.yourName')}
                  slotProps={{ htmlInput: { pattern: '.*\\S.*' } }}
                />
              )}
              <TextField
                id="auth-email"
                name="email"
                label={t('auth.email')}
                type="email"
                autoComplete="email"
                disabled={pending}
                required
                placeholder="you@example.com"
                defaultValue={state?.email}
              />
              <TextField
                id="auth-password"
                name="password"
                label={t('auth.password')}
                type={showPassword ? 'text' : 'password'}
                autoComplete={registering ? 'new-password' : 'current-password'}
                disabled={pending}
                required
                placeholder={registering ? t('registration.newPassword') : t('login.enterPassword')}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          type="button"
                          disabled={pending}
                          size="small"
                          aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {t(showPassword ? 'auth.hide' : 'auth.show')}
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {error && <Alert severity="error">{t(error)}</Alert>}
              <Button type="submit" variant="contained" loading={pending} size="large">
                {pending
                  ? registering
                    ? t('registration.creating')
                    : t('login.signingIn')
                  : registering
                    ? t('registration.create')
                    : t('login.signIn')}
              </Button>
            </Box>
          </Box>
          <Typography align="center" color="text.secondary" variant="body2" sx={{ mt: 3 }}>
            {registering ? t('registration.existing') : t('login.newUser')}{' '}
            <MuiLink
              component={Link}
              to={registering ? '/login' : '/register'}
              state={{ returnTo: state?.returnTo }}
            >
              {registering ? t('login.signIn') : t('login.createLink')}
            </MuiLink>
          </Typography>
        </div>
      </Box>
    </Box>
  )
}
