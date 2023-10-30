import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Breadcrumbs = () => {
  const categoryLink = useSelector((state) => state.categoryLink)
  const wishlistLink = useSelector((state) => state.wishlistLink)

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
