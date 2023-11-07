import NavBar from './navigation/desktop/NavBar'
import Footer from './navigation/desktop/Footer'

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  )
}

export default PageLayout
