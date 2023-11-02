import NavBar from './navigation/desktop/NavBar'
import Breadcrumbs from './navigation/desktop/Breadcrumbs'
import Notification from './Notification'

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Breadcrumbs />
      <Notification />
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
