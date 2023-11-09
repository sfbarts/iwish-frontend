import { Link } from 'react-router-dom'
import LogoutButton from '../../buttons/logout-button'

//NavBar contains the header content and uses LogoutButton Component
const NavBar = () => {
  return (
    <header className="nav-bar">
      <Link to="/" className="logo-link" name="iWish Home">
        <img
          className="logo"
          src="/assets/IWish_Logo_600x206.png"
          loading="lazy"
          alt="iWish Logo Image"
        />
      </Link>

      <nav className="user-menu">
        <LogoutButton />
      </nav>
    </header>
  )
}

export default NavBar
