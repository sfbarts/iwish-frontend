import { useState } from 'react'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import categoriesService from '../services/categories'

const CategoryButton = (props) => {
  //define useNavigate to use it later for routing to each specific category
  const navigate = useNavigate()

  //originalCategory handles original states to compare if changes have been made
  //category state handles the category state
  const [originalCategory, setOriginalCategory] = useState(props.category)
  const [category, setCategory] = useState(props.category)
  const [editing, setEditing] = useState(false)

  //only render when there are wishlists
  if (!category) {
    return
  }

  //handle each category button to show a specific category
  const handleCategoryClick = (e, category) => {
    if (!category.name) {
      window.alert('Category needs a name')
      return
    }
    navigate(`/category/${category.id}`, { state: category })
  }

  //handle name edit button
  const handleEditClick = async (e) => {
    const editButton = e.target

    if (!editing) {
      editButton.textContent = 'Save'
    } else {
      if (category.name !== originalCategory.name) {
        console.log('Save only if changed')
        await categoriesService.updateCategory(category)
        setOriginalCategory(category)
      }
      editButton.textContent = 'Edit name'
    }
    setEditing(!editing)
  }

  //handle name change
  const handleNameChange = (e) => {
    const newName = { ...category, name: e.target.value }
    setCategory(newName)
  }

  //handle category deletion
  const handleDeleteCategory = async () => {
    const updatedCategories = props.categories.filter(
      (c) => c.id !== category.id
    )
    props.setCategories(updatedCategories)
    await categoriesService.deleteCategory(category.id)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={category.name}
          readOnly={!editing}
          onChange={handleNameChange}
        />
        <button onClick={(e) => handleEditClick(e)}>Edit Name</button>
      </div>
      <button onClick={(e) => handleCategoryClick(e, category)}>
        See Wishlists
      </button>
      <button onClick={handleDeleteCategory}>Delete</button>
    </div>
  )
}

export default CategoryButton
