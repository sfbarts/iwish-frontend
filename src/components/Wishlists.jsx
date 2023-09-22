import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import wishlistsService from '../services/wishlists'

const Wishlists = () => {
  //Use wishlists state to control wishlists buttons
  const [wishlists, setWishlists] = useState(null)

  //define useNavigate to use it later for routing to each specific list
  const navigate = useNavigate()

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

  //handle each wihslist button to show a specific list
  const handleWishlistClick = (e, wishlist) => {
    navigate(`/wishlists/${wishlist.name}`, { state: wishlist })
  }

  console.log(wishlists)

  //render a button for each list
  return (
    <div>
      {wishlists.map((wishlist) => (
        <button
          key={wishlist.id}
          onClick={(e) => handleWishlistClick(e, wishlist)}
        >
          {wishlist.name}${wishlist.total}
        </button>
      ))}
    </div>
  )
}

export default Wishlists
