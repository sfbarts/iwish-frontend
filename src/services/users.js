import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_SERVER_URL}/api/users`

//Add User
const addUser = async (accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const response = await axios.post(baseUrl, {}, config)
  return response.data
}

export default {
  addUser,
}
