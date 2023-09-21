import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/items'

//Get all items from a specific wishlist
const getAll = async () => {
  //temporary wishlist id
  const tempWishlistId = '650a1a9d561cd48a13a4f05a'
  const request = await axios.get(`${baseUrl}/${tempWishlistId}`)
  return request.data
}

export default { getAll }
