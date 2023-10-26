import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import categoriesService from '../services/categories'

const CategoryButton = (props) => {
  //define useNavigate to use it later for routing to each specific category
  const navigate = useNavigate()

  //originalCategory handles original states to compare if changes have been made
  //category state handles the category state
  const [originalCategory, setOriginalCategory] = useState(props.category)
  const [category, setCategory] = useState(props.category)
  const [editing, setEditing] = useState(false)

  const inputRef = useRef(null)

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
      editButton.name = 'save'
    } else {
      if (category.name !== originalCategory.name) {
        await categoriesService.updateCategory(props.accessToken, category)
        setOriginalCategory(category)
      }
      editButton.name = 'pencil-outline'
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
    console.log(category.id)
    const updatedCategories = props.categories.filter(
      (c) => c.id !== category.id
    )
    props.setCategories(updatedCategories)
    await categoriesService.deleteCategory(props.accessToken, category.id)
  }

  return (
    <div className="card card__category">
      <div className="card-icon delete-icon">
        <ion-icon
          onClick={handleDeleteCategory}
          name="close-circle-outline"
        ></ion-icon>
      </div>
      <div className="card-name">
        {!editing ? (
          <p className="upper bold medium">{category.name}</p>
        ) : (
          <input
            className="input-name medium"
            type="text"
            value={category.name}
            onChange={handleNameChange}
            autoFocus
          />
        )}

        <div className="card-icon edit-icon">
          <ion-icon
            onClick={(e) => handleEditClick(e)}
            name="pencil-outline"
          ></ion-icon>
        </div>
      </div>
      <div className="card-icon">
        <ion-icon
          onClick={(e) => handleCategoryClick(e, category)}
          name="eye"
        ></ion-icon>
      </div>
    </div>
  )
}

export default CategoryButton
