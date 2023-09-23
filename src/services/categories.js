import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/categories'

//Get all categories
const getAll = async () => {
  const request = await axios.get(`${baseUrl}`)
  return request.data
}

//get all wishlists from a category base on id
const getCategory = async (categoryId) => {
  const request = await axios.get(`${baseUrl}/${categoryId}`)
  return request.data
}

//Add new category to a user
const addCategory = async (newCategory) => {
  const response = await axios.post(baseUrl, newCategory)
  return response.data
}

//Update category based on its id
const updateCategory = async (category) => {
  const response = await axios.put(`${baseUrl}/${category.id}`, category)
  return response.data
}

//Delete category based on its id
const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${baseUrl}/${categoryId}`)
  return response.data
}

export default {
  getAll,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}
