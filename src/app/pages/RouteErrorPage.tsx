import { Alert, Button, Container, Stack, Typography } from '@mui/material'
import { useLocale } from '../../i18n/locale-context'
import { isRouteErrorResponse, useRouteError } from 'react-router'

export default function RouteErrorPage() {
  const { t } = useLocale()
  const error: unknown = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${t('routeError.failed')} (${error.status})`
    : t('routeError.unexpected')

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        <Alert severity="error">{t('routeError.displayError')}</Alert>

        <Button
          variant="contained"
          type="button"
          onClick={() => {
            window.location.reload()
          }}
        >
          {t('routeError.reload')}
        </Button>

        <Button href="/">{t('routeError.errorReturnHome')}</Button>
      </Stack>
    </Container>
  )
}
