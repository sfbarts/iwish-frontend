import { useState } from 'react'
import { Link } from 'react-router-dom'
import categoriesService from '../services/categories'

const CategoryButton = (props) => {
  //originalCategory handles original states to compare if changes have been made
  //category state handles the category state
  const [originalCategory, setOriginalCategory] = useState(props.category)
  const [category, setCategory] = useState(props.category)
  const [editing, setEditing] = useState(false)

  //only render when there are wishlists
  if (!category) {
    return
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
      <div className="card-name-container">
        {!editing ? (
          <p className="card-name upper bold medium">{category.name}</p>
        ) : (
          <input
            className="input-name input-name__category medium"
            type="text"
            value={category.name}
            onChange={handleNameChange}
            maxLength={20}
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
      <Link className="card-icon" to={`/category/${category.id}`}>
        <ion-icon name="eye"></ion-icon>
      </Link>
    </div>
  )
}

export default CategoryButton
