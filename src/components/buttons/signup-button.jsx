import { useAuth0 } from '@auth0/auth0-react'

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
