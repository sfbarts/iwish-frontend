import LogoutButton from '../../buttons/logout-button'

const NavBar = () => {
  return (
    <header className="nav-bar">
      <img className="logo" src="/assets/IWish_Logo_600x206.png" />
      <nav className="user-menu">
        <LogoutButton />
      </nav>
    </header>
  )
}

export default NavBar
