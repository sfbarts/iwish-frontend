import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <p>
        Designed and Developed by Sebastian Beltran. Copyright &copy; 2023 - All
        rights reserved.
      </p>
    </footer>
  )
}

export default Footer
