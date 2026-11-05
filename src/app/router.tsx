import { createBrowserRouter } from 'react-router'

import AppLayout from '../components/layout/AppLayout'
import HomePage from '../features/home/pages/HomePage'
import MeetingsPage from '../features/meetings/pages/MeetingsPage'
import NotFoundPage from './pages/NotFoundPage'
import RouteErrorPage from './pages/RouteErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'meetings',
        Component: MeetingsPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
