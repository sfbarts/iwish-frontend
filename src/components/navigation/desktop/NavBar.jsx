import LogoutButton from '../../buttons/logout-button'

const NavBar = () => {
  return (
    <header className="nav-bar">
      <p className="logo large">iWISH - temp</p>
      <nav className="user-menu">
        <LogoutButton />
      </nav>
    </header>
  )
}

export default NavBar
