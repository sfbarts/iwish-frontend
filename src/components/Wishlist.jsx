import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import { setNotification } from '../reducers/notificationReducer'
import wishlistsService from '../services/wishlists'
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
  //declare react-router useNavigate hook
  const navigate = useNavigate()

  //originalItems controls state of items based on DB. It is directly related to DB.
  const [originalItems, setOriginalItems] = useState(null)
  //items controls the most up to date state of items.
  const [items, setItems] = useState(null)
  //wishlistName controls the name of wishlist name which is used when navigating directly.
  const [wishlistName, setWishlistName] = useState('')
  //accessToken state holds the authentication token to pass to backend
  const [accessToken, setAccessToken] = useState('')
  //declare getAccessTokenSilently hook from Auth0
  const { getAccessTokenSilently } = useAuth0()

  //getWishlist is used on useEffect hook to setup wishlist on first render
  const getWishlist = async () => {
    //Get initial wishlist from DB and setup all initial states.
    try {
      const accessToken = await getAccessTokenSilently()
      setAccessToken(accessToken)
      const initialWishlist = await wishlistsService.getWishlist(
        accessToken,
        wishlistId
      )
      setWishlistName(initialWishlist[0].name)
      setItems(initialWishlist[1])
      setOriginalItems(initialWishlist[1])
      //set wishlist adn category links for breadcrumbs.
      dispatch(
        setWishlistLink({
          name: initialWishlist[0].name,
          path: `/wishlists/${wishlistId}`,
        })
      )
      dispatch(
        setCategoryLink({
          name: initialWishlist[0].category.name,
          path: `/category/${initialWishlist[0].category.id}`,
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

  //getItems is used to retrieve items once new
  const getItems = async () => {
    const initialItems = await itemsService.getAll(accessToken, wishlistId)
    setItems(initialItems)
    setOriginalItems(initialItems)
  }

  //This useEffect get the items from the backend and assigns them to items state on render
  useEffect(() => {
    getWishlist()
  }, [])

  if (!items) {
    return
  }

  //addEmptyRow function adds a new item to the list.
  const addEmptyRow = async () => {
    //Prevent creation of items if limit of 30 reached.
    if (items.length === 30) {
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
    console.log(saveItem)
    const newItems = items.concat(saveItem)
    setItems(newItems)
  }

  //saveList function compare current items in wishlist with previous items and save changed items.
  const saveList = async () => {
    //check if the lists are different and if so compare each item to one another. Then send a request for the changed items.
    if (items !== originalItems) {
      let changedItems = []
      for (let i = 0; i < items.length; i++) {
        if (items[i] !== originalItems[i]) {
          changedItems.push(items[i])
        }
      }

      //If changed items contains items then update items if not it means that lists are not the same but beacause items were deleted so don't update DB
      if (changedItems.length) {
        const updateItems = await itemsService.updateItems(
          accessToken,
          changedItems
        )
        getItems()
      }
    }

    navigate(categoryLink)
  }

  //Total controls the total price of the wishlist updating it as they are typed.
  const total = items
    .reduce((sum, item) => sum + Number(item.price), 0)
    .toFixed(2)

  return (
    <div className="wishlist-container">
      <div className="wishlist-title-container">
        <h1 className="wishlist-title">{wishlistName}</h1>
        <div className="wishlist-close card-icon delete-icon">
          <p className="close-text">Close to save!</p>
          <ion-icon onClick={saveList} name="close-circle-outline"></ion-icon>
        </div>
      </div>

      <div className="wishlist-list">
        <p className="wishlist-header regular-medium semi-bold">Item</p>
        <p className="wishlist-header regular-medium semi-bold">Link/Store</p>
        <p className="wishlist-header regular-medium semi-bold">Price</p>
        <p className="wishlist-header regular-medium bold">&#10003;</p>
        <div className="wishlist-header"></div>
        {items
          .toSorted(
            (firstItem, secondItem) => firstItem.acquired - secondItem.acquired
          )
          .map((item) => (
            <Item
              key={item.id}
              item={item}
              items={items}
              setItems={setItems}
              accessToken={accessToken}
            />
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
