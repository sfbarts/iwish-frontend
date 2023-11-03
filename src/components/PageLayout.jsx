import NavBar from './navigation/desktop/NavBar'
import Breadcrumbs from './navigation/desktop/Breadcrumbs'
import Notification from './Notification'
import Footer from './navigation/desktop/Footer'

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <Breadcrumbs />
      <Notification />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  )
}

export default PageLayout
