import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { saveWishlist } from '../../reducers/modifiedListReducer'

// LoginButton handles Auth0 logout form using its logout hook. Only renders if user logged in.
const LogoutButton = () => {
  const { logout, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const dispatch = useDispatch()

  const handleLogout = async () => {
    const accessToken = await getAccessTokenSilently()
    dispatch(saveWishlist(accessToken))
    logout({
      logoutParams: {
        returnTo: window.location.origin + '/login',
      },
    })
  }

  return (
    <>
      {!isAuthenticated && <div></div>}
      {isAuthenticated && (
        <>
          <button
            className="auth-button auth-button__logout regular upper bold"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </>
      )}
    </>
  )
}

export default LogoutButton
