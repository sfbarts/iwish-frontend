import { useAuth0 } from '@auth0/auth0-react'

// SignupButton handles redirection to Auth0 signup form using Auth0 loginWithRedirect hook
const SignupButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/signup',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    })
  }

  return (
    <button
      className="auth-button auth-button__signup medium upper bold"
      onClick={handleSignUp}
    >
      Sign Up
    </button>
  )
}

export default SignupButton
