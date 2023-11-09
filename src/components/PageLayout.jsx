import NavBar from './navigation/desktop/NavBar'
import Footer from './navigation/desktop/Footer'

//PageLayout component renders the basic component structure for most of the app experience.
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
