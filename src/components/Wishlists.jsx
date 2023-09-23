import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import wishlistsService from '../services/wishlists'
import WishlistButton from './WishlistButton'

const Wishlists = () => {
  const categoryData = useLocation()
  const categoryId = categoryData.state.id

  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)

  //get wishlists from database
  useEffect(() => {
    const getWishlists = async () => {
      const initialWishlists = await wishlistsService.getAll(categoryId)
      setWishlists(initialWishlists)
    }

    getWishlists()
  }, [])

  //only render when there are wishlists
  if (!wishlists) {
    return
  }

  console.log(wishlists)

  const handleAddWishlist = async () => {
    const newWishlist = {
      name: '',
      category: categoryId,
    }

    //Save empty wishlist to the database
    const saveWishlist = await wishlistsService.addWishlist(newWishlist)
    const newWishlists = wishlists.concat(saveWishlist)
    setWishlists(newWishlists)
  }

  //render a button for each list
  return (
    <div>
      <h2>{categoryData.state.name}</h2>
      {wishlists.map((wishlist) => (
        <WishlistButton
          key={wishlist.id}
          wishlist={wishlist}
          wishlists={wishlists}
          setWishlists={setWishlists}
        />
      ))}
      <button onClick={handleAddWishlist}>Add wishlist</button>
    </div>
  )
}

export default Wishlists
