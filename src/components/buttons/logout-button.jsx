import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0()

  const handleLogout = () => {
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
