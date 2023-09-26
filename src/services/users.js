import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

//Add User
const addUser = async (userId) => {
  const response = await axios.post(baseUrl, userId)
  return response.data
}

export default {
  addUser,
}
