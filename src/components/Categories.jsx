import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import categoriesService from '../services/categories'
import CategoryButton from './CategoryButton'

const Categories = () => {
  const dispatch = useDispatch()

  //Use categories state to control categories buttons
  const [categories, setCategories] = useState(null)
  const [newName, setNewName] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const { getAccessTokenSilently } = useAuth0()

  //get wishlists from database
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

  //handleNewName controls input value
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  //handleAddCategory controls adding new categories
  const handleAddCategory = async () => {
    if (categories.length === 10) {
      dispatch(
        setNotification(
          {
            message:
              'You have reached the max category limit of 10. Please delete one to continue.',
            type: 'error',
          },
          3
        )
      )
      return
    }

    const name = newName
    if (!name) {
      dispatch(
        setNotification({ message: 'Category needs a name.', type: 'error' }, 3)
      )
      return
    }
    const newCategory = {
      name: name,
    }

    //Save empty category to the database
    const saveCategory = await categoriesService.addCategory(
      accessToken,
      newCategory
    )

    const newCategories = categories.concat(saveCategory)
    console.log(saveCategory)
    setCategories(newCategories)
    setNewName('')
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    }
  }

  //render a button for each category
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
        <input
          className="input-name input-name__category medium"
          type="text"
          placeholder="category name"
          onChange={handleNewName}
          onKeyDown={handleEnterPress}
          maxLength={50}
          value={newName}
        />
        <div className="card-icon add-icon" onClick={handleAddCategory}>
          +
        </div>
      </div>
    </div>
  )
}

export default Categories
