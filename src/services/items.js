import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_SERVER_URL}/api/items`

//Get all items from a specific wishlist
const getAll = async (accessToken, wishlistId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const request = await axios.get(`${baseUrl}/${wishlistId}`, config)
  return request.data
}

//Add new item to a wishlist
const addItem = async (accessToken, newItem) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.post(baseUrl, newItem, config)
  return response.data
}

//Update items
const updateItems = async (accessToken, items) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.put(`${baseUrl}`, items, config)
  return response.data
}

//Delete item based on item id
const deleteItem = async (accessToken, itemId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.delete(`${baseUrl}/${itemId}`, config)
  return response.data
}

export default { getAll, addItem, updateItems, deleteItem }
