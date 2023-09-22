import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/items'

//Get all items from a specific wishlist
const getAll = async (wishlistId) => {
  const request = await axios.get(`${baseUrl}/${wishlistId}`)
  return request.data
}

//Add new item to a wishlist
const addItem = async (newItem) => {
  const response = await axios.post(baseUrl, newItem)
  return response.data
}

//Update item based on item id
const updateItem = async (item) => {
  const response = await axios.put(`${baseUrl}/${item.id}`, item)
  return response.data
}

//Delete item based on item id
const deleteItem = async (itemId) => {
  const response = await axios.delete(`${baseUrl}/${itemId}`)
  return response.data
}

export default { getAll, addItem, updateItem, deleteItem }
