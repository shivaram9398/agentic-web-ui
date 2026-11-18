import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
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
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 2 }, py: 1 }}>
            <Typography sx={{ fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
              Agentic Meetings Manager
            </Typography>
            <Box
              component="nav"
              aria-label={t('navigation.navigation')}
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
            >
              <Button
                component={NavLink}
                to="/"
                end
                sx={{ '&.active': { bgcolor: 'action.selected' } }}
              >
                {t('navigation.home')}
              </Button>
              <Button
                component={NavLink}
                to="/meetings"
                sx={{ '&.active': { bgcolor: 'action.selected' } }}
              >
                {t('navigation.meetings')}
              </Button>
              <Button onClick={handleSignOut}>{t('navigation.signOut')}</Button>
            </Box>
            <Box sx={{ ml: { xs: 0, sm: 'auto' }, maxWidth: '100%' }}>
              <LanguagePicker />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" id="main-content" maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Outlet />
      </Container>
    </>
  )
}
