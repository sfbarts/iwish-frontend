import { useState, useEffect } from 'react'
import wishlistsService from '../services/wishlists'
import WishlistButton from './WishlistButton'

const Wishlists = () => {
  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)

  //get wishlists from database
  useEffect(() => {
    const getWishlists = async () => {
      const initialWishlists = await wishlistsService.getAll()
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
    const categoryId = wishlists[0].category.id
    const newWishlist = {
      name: '',
      category: categoryId,
    }

    //Save empty wishlist to the database
    const saveWishlist = await wishlistsService.addWishlist(newWishlist)
    console.log(saveWishlist)
    const newWishlists = wishlists.concat(saveWishlist)
    setWishlists(newWishlists)
  }

  //render a button for each list
  return (
    <div>
      {wishlists.map((wishlist) => (
        <WishlistButton key={wishlist.id} wishlist={wishlist} />
      ))}
      <button onClick={handleAddWishlist}>Add wishlist</button>
    </div>
  )
}

export default Wishlists
