import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import categoriesService from '../services/categories'
import CategoryButton from './CategoryButton'
import Tooltip from './CustomTooltip'

//Categories component renders all CategoryButton components from categories that belong to a user.
const Categories = () => {
  //Define redux dispatch hook
  const dispatch = useDispatch()

  //Use categories state to control categories buttons
  const [categories, setCategories] = useState(null)
  //newName state handles the name of new categories
  const [newName, setNewName] = useState('')
  //accessToken state holds the authentication token to pass to backend
  const [accessToken, setAccessToken] = useState('')
  //declare getAccessTokenSilently hook from Auth0
  const { getAccessTokenSilently } = useAuth0()

  //get wishlists from database by passing the access token to the categories service.
  useEffect(() => {
    const getCategories = async () => {
      const accessToken = await getAccessTokenSilently()
      const initialCategories = await categoriesService.getAll(accessToken)
      setCategories(initialCategories)
      setAccessToken(accessToken)
    }

    getCategories()
  }, [getAccessTokenSilently])

  //only render when there are categories
  if (!categories) {
    return
  }

  //handleNewName controls input value and sets newName state
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  //handleAddCategory controls adding new categories by passing newName state to categories service after adding a category.
  const handleAddCategory = async () => {
    //Prevent creation of categories if limit of 10 reached.
    if (categories.length === 10) {
      dispatch(
        setNotification(
          {
            message:
              'You have reached the max category limit of 10. Please delete one to continue.',
            type: 'warning',
          },
          3
        )
      )
      return
    }

    //Get new name state and if no name added, notify.
    const name = newName
    if (!name) {
      dispatch(
        setNotification({ message: 'Category needs a name.', type: 'error' }, 3)
      )
      return
    }

    //Create a category object with new name to pass to categories Service
    const newCategory = {
      name: name,
    }

    //Save empty category to the database
    const saveCategory = await categoriesService.addCategory(
      accessToken,
      newCategory
    )

    //Update categories on the frontend
    const newCategories = categories.concat(saveCategory)
    setCategories(newCategories)
    setNewName('')
  }

  //Allow triggering of category creation by pressing enter key.
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    }
  }

  //render a CategoryButton for each category and a constant Add Category button at the end.
  return (
    <div className="cards-container">
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          categories={categories}
          setCategories={setCategories}
          accessToken={accessToken}
        />
      ))}
      <div className="card card__add card__add-category">
        <Tooltip disableHoverListener title="Press enter or click '+' to add">
          <input
            className="input-name input-name__category medium"
            type="text"
            placeholder="category name"
            onChange={handleNewName}
            onKeyDown={handleEnterPress}
            maxLength={50}
            value={newName}
          />
        </Tooltip>
        <Tooltip title="Add category">
          <div className="card-icon add-icon" onClick={handleAddCategory}>
            +
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Categories
