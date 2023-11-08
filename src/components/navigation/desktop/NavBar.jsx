import { Link } from 'react-router-dom'
import LogoutButton from '../../buttons/logout-button'

const NavBar = () => {
  return (
    <header className="nav-bar">
      <Link to="/">
        <img
          className="logo"
          src="/assets/IWish_Logo_600x206.png"
          loading="lazy"
        />
      </Link>

      <nav className="user-menu">
        <LogoutButton />
      </nav>
    </header>
  )
}

export default NavBar
