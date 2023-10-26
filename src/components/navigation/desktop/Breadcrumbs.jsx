import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Breadcrumbs = () => {
  const categoryLink = useSelector((state) => state.categoryLink)
  const wishlistLink = useSelector((state) => state.wishlistLink)

  return (
    <div className="breadcrumbs">
      <Link to="/">Categories</Link> /
      {categoryLink.name.length > 0 ? (
        <>
          <Link to={categoryLink.path}>{categoryLink.name}</Link> /
          <Link to={wishlistLink.path}>{wishlistLink.name}</Link>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default Breadcrumbs
