import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

//Breadcrumbs handles the rendering of breadcrumbs on app.
const Breadcrumbs = () => {
  //get links and names using redux useSelector hook working with reducers
  const categoryLink = useSelector((state) => state.categoryLink)
  const wishlistLink = useSelector((state) => state.wishlistLink)

  //Only render if there is a name on the reducer's state
  return (
    <div className="breadcrumbs">
      <Link className="breadcrumb-link" to="/">
        Categories
      </Link>
      <span>/</span>
      {categoryLink.name.length > 0 ? (
        <>
          <Link className="breadcrumb-link" to={categoryLink.path}>
            {categoryLink.name}
          </Link>
          <span>/</span>
        </>
      ) : (
        ''
      )}
      {wishlistLink.name.length > 0 ? (
        <Link className="breadcrumb-link" to={wishlistLink.path}>
          {wishlistLink.name}
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default Breadcrumbs
