import NavBar from './navigation/desktop/NavBar'

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
