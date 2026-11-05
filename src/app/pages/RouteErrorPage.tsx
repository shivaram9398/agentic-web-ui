import { isRouteErrorResponse, useRouteError } from 'react-router'

export default function RouteErrorPage() {
  const error: unknown = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `Request failed (${error.status})`
    : 'Something went wrong'

  return (
    <main>
      <h1>{title}</h1>
      <p>We couldn’t display this page. Please try again.</p>

      <button
        type="button"
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload page
      </button>

      <p>
        <a href="/">Return home</a>
      </p>
    </main>
  )
}
