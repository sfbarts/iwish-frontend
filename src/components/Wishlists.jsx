import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import wishlistsService from '../services/wishlists'
import categoriesService from '../services/categories'
import WishlistButton from './WishlistButton'

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
    const name = newName
    if (!name) {
      window.alert('Wishlist name is required')
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
        <input
          className="input-name input-name__wishlist medium"
          type="text"
          placeholder="wishlist name"
          onChange={handleNewName}
          value={newName}
        />
        <div className="card-icon add-icon" onClick={handleAddWishlist}>
          +
        </div>
      </div>
    </div>
  )
}

export default Wishlists
