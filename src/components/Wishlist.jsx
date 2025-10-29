import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import { setNotification } from '../reducers/notificationReducer'
import { saveWishlist } from '../reducers/modifiedListReducer'
import {
  updateWishlist,
  selectWishlist,
  resetWishlist,
  retrieveWishlist,
} from '../reducers/wishlistReducer'
import itemsService from '../services/items'
import Item from './Item'

//Wishlist Component renders the actual Wishlist component where items are added.
const Wishlist = () => {
  //Get wishlist id from path
  const wishlistId = useParams().id

  //declare Redux dispatch and useSelector hooks
  const dispatch = useDispatch()
  //useSelector gets the categoryLink state to set the breadcrumbs when navigating directy from the browser's search
  const categoryLink = useSelector((state) => state.categoryLink.path)

  //get the state of the wishlist
  const wishlist = useSelector(selectWishlist)

  //declare react-router useNavigate hook
  const navigate = useNavigate()

  //wishlistName controls the name of wishlist name which is used when navigating directly.
  const [wishlistName, setWishlistName] = useState('')
  const [total, setTotal] = useState(0)

  //accessToken state holds the authentication token to pass to backend
  const [accessToken, setAccessToken] = useState('')

  //declare getAccessTokenSilently hook from Auth0
  const { getAccessTokenSilently } = useAuth0()

  //Total controls the total price of the wishlist updating it as they are typed.
  const totalSum = useMemo(() => {
    return wishlist.items
      .reduce((sum, item) => sum + Number(item.price), 0)
      .toFixed(2)
  }, [wishlist.items])

  //getWishlist is used on useEffect hook to setup wishlist on first render
  const getWishlist = useCallback(async () => {
    //Get initial wishlist from DB and setup all initial states.
    try {
      const token = await getAccessTokenSilently()
      setAccessToken(token)
      dispatch(retrieveWishlist(token, wishlistId))
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
  }, [getAccessTokenSilently, wishlistId])

  //This useEffect get the items from the backend and assigns them to items state on render
  useEffect(() => {
    getWishlist()
  }, [getWishlist])

  useEffect(() => {
    if (wishlist.info !== undefined) {
      if (Object.keys(wishlist.info).length !== 0) {
        setWishlistName(wishlist.info.name)
        // set wishlist adn category links for breadcrumbs.
        dispatch(
          setWishlistLink({
            name: wishlist.info.name,
            path: `/wishlists/${wishlistId}`,
          })
        )
        dispatch(
          setCategoryLink({
            name: wishlist.info.category.name,
            path: `/category/${wishlist.info.category.id}`,
          })
        )
        setTotal(totalSum)
      }
    }
  }, [wishlist, totalSum])

  if (!wishlistName) {
    return null
  }

  //addEmptyRow function adds a new item to the list.
  const addEmptyRow = async () => {
    //Prevent creation of items if limit of 30 reached.
    if (wishlist.items.length === 30) {
      dispatch(
        setNotification(
          {
            message: 'You can only have a max of 30 items per wishlist.',
            type: 'error',
          },
          3
        )
      )
      return
    }

    const newItem = {
      name: '',
      url: '',
      wishlist: wishlistId,
    }

    //Save empty item to the database
    const saveItem = await itemsService.addItem(accessToken, newItem)
    dispatch(updateWishlist(saveItem))
  }

  //saveList function gets the modifiedList state and uses itemsService.update to update the items in the server.
  const handleListClose = async () => {
    //Save to server if there are any items changed.

    await dispatch(saveWishlist(accessToken))
    dispatch(resetWishlist())
    navigate(categoryLink, { state: total })
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-title-container">
        <h1 className="wishlist-title">{wishlistName}</h1>
        <div className="wishlist-close card-icon delete-icon">
          {/* <p className="close-text">Close to save!</p> */}
          <ion-icon
            onClick={handleListClose}
            name="close-circle-outline"
          ></ion-icon>
        </div>
      </div>

      <div className="wishlist-list">
        <p className="wishlist-header regular-medium semi-bold">Item</p>
        <p className="wishlist-header regular-medium semi-bold">Link/Store</p>
        <p className="wishlist-header regular-medium semi-bold">Price</p>
        <p className="wishlist-header regular-medium bold">&#10003;</p>
        <div className="wishlist-header"></div>
        {wishlist.items
          .toSorted(
            (firstItem, secondItem) => firstItem.acquired - secondItem.acquired
          )
          .map((item) => (
            <Item key={item.id} item={item} accessToken={accessToken} />
          ))}
        <div className="wishlist-add-item">
          <div className="add-icon__item regular-medium" onClick={addEmptyRow}>
            +
          </div>
        </div>
      </div>

      <p className="wishlist-total medium semi-bold">Total: ${total}</p>
    </div>
  )
}

export default Wishlist
