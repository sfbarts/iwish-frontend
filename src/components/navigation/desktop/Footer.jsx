import { Link } from 'react-router-dom'

//Footer component defines Footer content
const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <p>
        Designed and Developed by Sebastian Beltran. Copyright &copy; {year} -
        All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
