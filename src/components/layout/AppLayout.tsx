import { NavLink, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <>
      <header>
        <p>Agentic Meetings Manager</p>

        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          {' | '}
          <NavLink to="/meetings">Meetings</NavLink>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>
    </>
  )
}
