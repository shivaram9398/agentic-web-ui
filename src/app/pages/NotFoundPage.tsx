import { useLocale } from '../../i18n/locale-context'
import { Link } from 'react-router'

export default function NotFoundPage() {
  const { t } = useLocale()
  return (
    <section>
      <h1>{t('notFound.notFound')}</h1>
      <p>{t('notFound.missing')}</p>
      <Link to="/">{t('notFound.returnHome')}</Link>
    </section>
  )
}
