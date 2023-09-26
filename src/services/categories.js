import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/categories'

//Get all categories
const getAll = async (accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const request = await axios.get(`${baseUrl}`, config)
  return request.data
}

//get all wishlists from a category base on id
const getCategory = async (accessToken, categoryId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const request = await axios.get(`${baseUrl}/${categoryId}`, config)
  return request.data
}

//Add new category to a user
const addCategory = async (accessToken, newCategory) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const response = await axios.post(baseUrl, newCategory, config)
  return response.data
}

//Update category based on its id
const updateCategory = async (accessToken, category) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.put(
    `${baseUrl}/${category.id}`,
    category,
    config
  )
  return response.data
}

//Delete category based on its id
const deleteCategory = async (accessToken, categoryId) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const response = await axios.delete(`${baseUrl}/${categoryId}`, config)
  return response.data
}

export default {
  getAll,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}
