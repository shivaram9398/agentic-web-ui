import { useLocale } from '../../i18n/locale-context'
import { isRouteErrorResponse, useRouteError } from 'react-router'

export default function RouteErrorPage() {
  const { t } = useLocale()
  const error: unknown = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${t('routeError.failed')} (${error.status})`
    : t('routeError.unexpected')

  return (
    <main>
      <h1>{title}</h1>
      <p>{t('routeError.displayError')}</p>

      <button
        type="button"
        onClick={() => {
          window.location.reload()
        }}
      >
        {t('routeError.reload')}
      </button>

      <p>
        <a href="/">{t('routeError.errorReturnHome')}</a>
      </p>
    </main>
  )
}
