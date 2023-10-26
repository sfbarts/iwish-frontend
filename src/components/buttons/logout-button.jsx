import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + '/login',
      },
    })
  }

  return (
    <button
      className="auth-button auth-button__logout regular upper bold"
      onClick={handleLogout}
    >
      Log Out
    </button>
  )
}

export default LogoutButton
