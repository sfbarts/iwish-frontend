import { withAuthenticationRequired } from '@auth0/auth0-react'
import PageLayout from './PageLayout'

//AuthenticationGuard component allows Routes to be protected by authentication. Any child component is only rendered if user is authenticated.
export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLayout></PageLayout>,
  })

  return <Component />
}

export default AuthenticationGuard
