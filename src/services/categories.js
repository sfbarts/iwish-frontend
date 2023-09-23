import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/categories'

//Get all items from a category
const getAll = async () => {
  //temporary user Id
  const tempUserId = '650a14c573d510a95e0fb3bf'
  const request = await axios.get(`${baseUrl}/${tempUserId}`)
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

export default { getAll, addCategory, updateCategory, deleteCategory }
