import NavBar from './navigation/desktop/NavBar'
import Breadcrumbs from './navigation/desktop/Breadcrumbs'

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Breadcrumbs />
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
