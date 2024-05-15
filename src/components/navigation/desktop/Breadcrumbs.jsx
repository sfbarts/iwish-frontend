import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { saveWishlist } from '../../../reducers/modifiedListReducer'

//Breadcrumbs handles the rendering of breadcrumbs on app.
const Breadcrumbs = () => {
  //get links and names using redux useSelector hook working with reducers
  const categoryLink = useSelector((state) => state.categoryLink)
  const wishlistLink = useSelector((state) => state.wishlistLink)

  const dispatch = useDispatch()

  //declare getAccessTokenSilently hook from Auth0
  const { getAccessTokenSilently } = useAuth0()

  const linkCallback = async () => {
    const accessToken = await getAccessTokenSilently()
    dispatch(saveWishlist(accessToken))
  }

  //Only render if there is a name on the reducer's state
  return (
    <div className="breadcrumbs">
      <Link className="breadcrumb-link" to="/" onClick={linkCallback}>
        Categories
      </Link>
      <span>/</span>
      {categoryLink.name.length > 0 ? (
        <>
          <Link
            className="breadcrumb-link"
            to={categoryLink.path}
            onClick={linkCallback}
          >
            {categoryLink.name}
          </Link>
          <span>/</span>
        </>
      ) : (
        ''
      )}
      {wishlistLink.name.length > 0 ? (
        <Link
          className="breadcrumb-link"
          to={wishlistLink.path}
          onClick={linkCallback}
        >
          {wishlistLink.name}
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default Breadcrumbs
