import { Paper, Stack, Typography } from '@mui/material'
import { useLocale } from '../../../i18n/locale-context'
export default function MeetingsPage() {
  const { t } = useLocale()
  return (
    <Paper component="section" variant="outlined" sx={{ p: { xs: 2, sm: 4 } }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h4">
          {t('meetings.meetingsTitle')}
        </Typography>
        <Typography color="text.secondary">{t('meetings.workspace')}</Typography>
      </Stack>
    </Paper>
  )
}
