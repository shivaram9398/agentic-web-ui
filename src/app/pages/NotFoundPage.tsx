import { Button, Paper, Stack, Typography } from '@mui/material'
import { useLocale } from '../../i18n/locale-context'
import { Link } from 'react-router'

export default function NotFoundPage() {
  const { t } = useLocale()
  return (
    <Paper component="section" variant="outlined" sx={{ p: { xs: 2, sm: 4 } }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h4">
          {t('notFound.notFound')}
        </Typography>
        <Typography color="text.secondary">{t('notFound.missing')}</Typography>
        <Button component={Link} to="/" variant="outlined">
          {t('notFound.returnHome')}
        </Button>
      </Stack>
    </Paper>
  )
}
