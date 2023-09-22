import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/wishlists'

const getAll = async () => {
  //temporary category id
  const tempCategoryId = '650a18246081432e28194a05'
  const request = await axios.get(`${baseUrl}/${tempCategoryId}`)
  return request.data
}

export default { getAll }
