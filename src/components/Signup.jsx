import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import userServices from '../services/users'
import PageLayout from './PageLayout'

//Signup is a transition component that allows us to save the user id from Auth0 in our own database when signing up.
const Signup = () => {
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()

  const createUser = async () => {
    const accessToken = await getAccessTokenSilently()
    const userSaved = await userServices.addUser(accessToken)
    console.log(userSaved)
    navigate('/')
  }

  createUser()
  return <PageLayout></PageLayout>
}

export default Signup
