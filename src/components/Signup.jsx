import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import userServices from '../services/users'

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
  return <div>Loading...</div>
}

export default Signup
