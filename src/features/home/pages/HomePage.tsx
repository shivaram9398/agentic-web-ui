import { useLocale } from '../../../i18n/locale-context'
export default function HomePage() {
  const { t } = useLocale()
  return (
    <section>
      <h1>{t('home.homeTitle')}</h1>
      <p>{t('home.welcome')}</p>
    </section>
  )
}
