import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import categoriesService from '../services/categories'
import CategoryButton from './CategoryButton'

const Categories = () => {
  //Use categories state to control categories buttons
  const [categories, setCategories] = useState(null)
  const [newName, setNewName] = useState('')

  const { getAccessTokenSilently } = useAuth0()

  //get wishlists from database
  useEffect(() => {
    const getCategories = async () => {
      const accessToken = await getAccessTokenSilently()
      const initialCategories = await categoriesService.getAll(accessToken)
      setCategories(initialCategories)
    }

    getCategories()
  }, [getAccessTokenSilently])

  //only render when there are categories
  if (!categories) {
    return
  }

  console.log(categories)

  //handleNewName controls input value
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  //handleAddCategory controls adding new categories
  const handleAddCategory = async () => {
    const userId = categories[0].user.id
    const name = newName
    if (!name) {
      window.alert('Category name is required')
      return
    }
    const newCategory = {
      name: name,
      user: userId,
    }

    //Save empty category to the database
    const saveCategory = await categoriesService.addCategory(newCategory)

    const newCategories = categories.concat(saveCategory)
    console.log(saveCategory)
    setCategories(newCategories)
    setNewName('')
  }

  //render a button for each category
  return (
    <div>
      <h2>Your Categories</h2>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          categories={categories}
          setCategories={setCategories}
        />
      ))}
      <input
        type="text"
        placeholder="category name"
        onChange={handleNewName}
        value={newName}
      />
      <button onClick={handleAddCategory}>Add category</button>
    </div>
  )
}

export default Categories
