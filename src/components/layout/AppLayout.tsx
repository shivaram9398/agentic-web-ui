import LanguagePicker from '../../i18n/LanguagePicker'
import { useLocale } from '../../i18n/locale-context'
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router'

import { isSignedIn, signOut } from '../../features/auth/auth'

export default function AppLayout() {
  const { t } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()

  if (!isSignedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ returnTo: location.pathname + location.search + location.hash }}
      />
    )
  }

  function handleSignOut() {
    signOut()
    void navigate('/login', { replace: true })
  }
  return (
    <>
      <header className="app-header">
        <p>Agentic Meetings Manager</p>

        <nav aria-label={t('navigation.navigation')}>
          <NavLink to="/" end>
            {t('navigation.home')}
          </NavLink>
          <NavLink to="/meetings">{t('navigation.meetings')}</NavLink>
          <button type="button" onClick={handleSignOut}>
            {t('navigation.signOut')}
          </button>
        </nav>
        <LanguagePicker />
      </header>

      <main id="main-content">
        <Outlet />
      </main>
    </>
  )
}
