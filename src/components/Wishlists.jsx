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

const Wishlists = () => {
  const categoryId = useParams().id
  const dispatch = useDispatch()

  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [newName, setNewName] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const { getAccessTokenSilently } = useAuth0()

  const getWishlists = async () => {
    try {
      const accessToken = await getAccessTokenSilently()
      const category = await categoriesService.getCategory(
        accessToken,
        categoryId
      )
      setCategoryName(category[0].name)
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

  //get wishlists from database
  useEffect(() => {
    getWishlists()
  }, [])

  //only render when there are wishlists
  if (!wishlists) {
    return
  }

  //handleNewName controls input value
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleAddWishlist = async () => {
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
    const name = newName
    if (!name) {
      dispatch(
        setNotification({ message: 'Wishlist needs a name.', type: 'error' }, 3)
      )
      return
    }
    const newWishlist = {
      name: name,
      category: categoryId,
    }

    //Save empty wishlist to the database
    const saveWishlist = await wishlistsService.addWishlist(
      accessToken,
      newWishlist
    )
    const newWishlists = wishlists.concat(saveWishlist)
    setWishlists(newWishlists)
    setNewName('')
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWishlist()
    }
  }

  //render a button for each list
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
