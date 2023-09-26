import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userServices from '../services/users'

const Signup = () => {
  const navigate = useNavigate()
  const { user } = useAuth0()

  const createUser = async () => {
    const userSaved = await userServices.addUser(user)
    console.log(userSaved)
    navigate('/')
  }

  if (!user) {
    return
  }

  createUser()
  return <div>{user.name}</div>
}

export default Signup
