import { useLocale } from '../../../i18n/locale-context'
export default function MeetingsPage() {
  const { t } = useLocale()
  return (
    <section>
      <h1>{t('meetings.meetingsTitle')}</h1>
      <p>{t('meetings.workspace')}</p>
    </section>
  )
}
