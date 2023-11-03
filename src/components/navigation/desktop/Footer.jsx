import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link>Terms & Conditions</Link>
        <Link>Privacy Policy</Link>
      </div>
      <p>Designed and Developed by Sebastian Beltran</p>
    </footer>
  )
}

export default Footer
