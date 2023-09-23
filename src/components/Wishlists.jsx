import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useParams } from 'react-router-dom'
import wishlistsService from '../services/wishlists'
import categoriesService from '../services/categories'
import WishlistButton from './WishlistButton'

const Wishlists = () => {
  const categoryId = useParams().id

  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)
  const [categoryName, setCategoryName] = useState('')

  const getWishlists = async () => {
    const category = await categoriesService.getCategory(categoryId)
    setCategoryName(category[0].name)
    setWishlists(category[1])
  }

  //get wishlists from database
  useEffect(() => {
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
      <h2>{categoryName}</h2>
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
