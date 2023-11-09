import { useAuth0 } from '@auth0/auth0-react'

// LoginButton handles redirection to Auth0 login form using Auth0 loginWithRedirect hook
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    })
  }

  return (
    <button
      className="auth-button auth-button__login medium upper bold"
      onClick={handleLogin}
    >
      Log In
    </button>
  )
}

export default LoginButton
