import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import { setNotification } from '../reducers/notificationReducer'
import wishlistsService from '../services/wishlists'
import categoriesService from '../services/categories'
import WishlistButton from './WishlistButton'
import Tooltip from './CustomTooltip'

//Wishlists component renders all WishlistButton components inside a category
const Wishlists = () => {
  //Get category id from path
  const categoryId = useParams().id
  //Define redux dispatch hook
  const dispatch = useDispatch()

  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)
  //newName state handles the name of new wishlists
  const [newName, setNewName] = useState('')
  //accessToken state holds the authentication token to pass to backend
  const [accessToken, setAccessToken] = useState('')
  //declare getAccessTokenSilently hook from Auth0
  const { getAccessTokenSilently } = useAuth0()

  //getWishlists is used on useEffect hook to setup all wishlists on first render
  const getWishlists = async () => {
    //Get initial wishlists from DB and setup all initial states.
    try {
      const accessToken = await getAccessTokenSilently()
      const category = await categoriesService.getCategory(
        accessToken,
        categoryId
      )
      setWishlists(category[1])
      setAccessToken(accessToken)
      dispatch(
        setCategoryLink({
          name: category[0].name,
          path: `/category/${categoryId}`,
        })
      )
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: 'Invalid URL, redirecting to home...',
            type: 'axiosError',
          },
          3
        )
      )
    }
  }

  //get wishlists from database using the getWishlists function
  useEffect(() => {
    getWishlists()
  }, [])

  //only render when there are wishlists
  if (!wishlists) {
    return
  }

  //handleNewName controls input value and sets newName state
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  //handleAddWishlist controls adding new categories by passing newName state to wishlists service after adding a category.
  const handleAddWishlist = async () => {
    //Prevent creation of wishlists if limit of 10 reached.
    if (wishlists.length === 10) {
      dispatch(
        setNotification(
          {
            message: 'You can only have a max of 10 wishlists per category.',
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
        setNotification({ message: 'Wishlist needs a name.', type: 'error' }, 3)
      )
      return
    }

    //Create a wishlist object with new name to pass to wishlists Service
    const newWishlist = {
      name: name,
      category: categoryId,
    }

    //Save empty wishlist to the database
    const saveWishlist = await wishlistsService.addWishlist(
      accessToken,
      newWishlist
    )

    //Update wishlists on the frontend
    const newWishlists = wishlists.concat(saveWishlist)
    setWishlists(newWishlists)
    setNewName('')
  }

  //Allow triggering of wishlist creation by pressing enter key.
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWishlist()
    }
  }

  //render a WishlistButton for each wishlist and a constant Add Wishlist button at the end.
  return (
    <div className="cards-container">
      {wishlists.map((wishlist) => (
        <WishlistButton
          key={wishlist.id}
          wishlist={wishlist}
          wishlists={wishlists}
          setWishlists={setWishlists}
          accessToken={accessToken}
        />
      ))}
      <div className="card card__add card__add-wishlist">
        <Tooltip disableHoverListener title="Press enter or click '+' to add">
          <input
            className="input-name input-name__wishlist medium"
            type="text"
            placeholder="wishlist name"
            onChange={handleNewName}
            onKeyDown={handleEnterPress}
            maxLength={50}
            value={newName}
          />
        </Tooltip>
        <Tooltip title="Add wishlist">
          <div className="card-icon add-icon" onClick={handleAddWishlist}>
            +
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Wishlists
