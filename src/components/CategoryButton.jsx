import { useState } from 'react'
import { Link } from 'react-router-dom'
import categoriesService from '../services/categories'
import Tooltip from './CustomTooltip'

const CategoryButton = (props) => {
  //originalCategory handles original states to compare if changes have been made
  const [originalCategory, setOriginalCategory] = useState(props.category)
  //category state handles the most up to date category state
  const [category, setCategory] = useState(props.category)
  //editing state is a boolean that helps us know if a category name is being edited in order to update name in DB and update icon.
  const [editing, setEditing] = useState(false)
  //editTooltipTitle controls the tooltip title of the category name edit icon.
  const [editTooltipTitle, setEditTooltipTitle] = useState('Edit name')

  //only render when there are categories
  if (!category) {
    return
  }

  //handleEditClick handles the category name change
  //It changes the icons and tooltips by changing the button name and updating tooltip states.
  //If category name is different than original then save to DB when save button pressed.
  const handleEditClick = async (e) => {
    const editButton = e.target

    if (!editing) {
      editButton.name = 'save'
      setEditTooltipTitle('Save name')
    } else {
      if (category.name !== originalCategory.name) {
        await categoriesService.updateCategory(props.accessToken, category)
        setOriginalCategory(category)
      }
      editButton.name = 'pencil-outline'
      setEditTooltipTitle('Edit name')
    }
    setEditing(!editing)
  }

  //handleNameChange updates category name when editing it.
  const handleNameChange = (e) => {
    const newName = { ...category, name: e.target.value }
    setCategory(newName)
  }

  //handleDeleteCategory removes category from DB and updates frontend.
  const handleDeleteCategory = async () => {
    const updatedCategories = props.categories.filter(
      (c) => c.id !== category.id
    )
    props.setCategories(updatedCategories)
    await categoriesService.deleteCategory(props.accessToken, category.id)
  }

  return (
    <div className="card card__category">
      <div className="card-icon delete-icon">
        <Tooltip title="Delete category">
          <ion-icon
            onClick={handleDeleteCategory}
            name="close-circle-outline"
          ></ion-icon>
        </Tooltip>
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
          <Tooltip title={editTooltipTitle}>
            <ion-icon
              onClick={(e) => handleEditClick(e)}
              name="pencil-outline"
            ></ion-icon>
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Open category">
        <Link className="card-icon" to={`/category/${category.id}`}>
          <ion-icon name="eye"></ion-icon>
        </Link>
      </Tooltip>
    </div>
  )
}

export default CategoryButton
