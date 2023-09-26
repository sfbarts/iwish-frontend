import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/wishlists'

//get a wishlist based on its id
const getWishlist = async (accessToken, wishlistId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const request = await axios.get(`${baseUrl}/${wishlistId}`, config)
  return request.data
}

//Add new wishlist to a category
const addWishlist = async (accessToken, newWishlist) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.post(baseUrl, newWishlist, config)
  return response.data
}

//Update wishlist based on wishlist id
const updateWishlist = async (accessToken, wishlist) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.put(
    `${baseUrl}/${wishlist.id}`,
    wishlist,
    config
  )
  return response.data
}

//Delete wishlists based on wishlist id
const deleteWishlist = async (accessToken, wishlistId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.delete(`${baseUrl}/${wishlistId}`, config)
  return response.data
}

export default {
  getWishlist,
  addWishlist,
  updateWishlist,
  deleteWishlist,
}
