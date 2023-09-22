import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/wishlists'

const getAll = async () => {
  //temporary category id
  const tempCategoryId = '650a18246081432e28194a05'
  const request = await axios.get(`${baseUrl}/${tempCategoryId}`)
  return request.data
}

//Add new wishlist to a category
const addWishlist = async (newWishlist) => {
  const response = await axios.post(baseUrl, newWishlist)
  return response.data
}

//Update wishlist based on wishlist id
const updateWishlist = async (wishlist) => {
  const response = await axios.put(`${baseUrl}/${wishlist.id}`, wishlist)
  return response.data
}

//Delete wishlists based on wishlist id
const deleteWishlist = async (wishlistId) => {
  const response = await axios.delete(`${baseUrl}/${wishlistId}`)
  return response.data
}

export default { getAll, addWishlist, updateWishlist, deleteWishlist }
