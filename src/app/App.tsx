import { RouterProvider } from 'react-router/dom'

import LocaleProvider from '../i18n/LocaleProvider'
import { router } from './router'

export default function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  )
}
