import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/items'

//Get all items from a specific wishlist
const getAll = async () => {
  //temporary wishlist id
  const tempWishlistId = '650a1a9d561cd48a13a4f05a'
  const request = await axios.get(`${baseUrl}/${tempWishlistId}`)
  return request.data
}

//Add new item to a wishlist
const addItem = async (newItem) => {
  const response = await axios.post(baseUrl, newItem)
  return response.data
}

//Update item
const updateItem = async (item) => {
  const response = await axios.put(`${baseUrl}/${item.id}`, item)
  return response.data
}

export default { getAll, addItem, updateItem }
