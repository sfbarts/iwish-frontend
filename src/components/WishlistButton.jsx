import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import wishlistsService from '../services/wishlists'

const WishlistButton = (props) => {
  //define useNavigate to use it later for routing to each specific list
  const navigate = useNavigate()

  //originalWishlist handles original states to compare if changes have been made
  //wishlist state handles the wishlist
  //Name handles the state for updating
  const [originalWishlist, setOriginalWishlist] = useState(props.wishlist)
  const [wishlist, setWishlist] = useState(props.wishlist)
  const [editing, setEditing] = useState(false)

  //only render when there are wishlists
  if (!wishlist) {
    return
  }

  //handle each wishlist button to show a specific list
  const handleWishlistClick = (e, wishlist) => {
    if (!wishlist.name) {
      window.alert('List needs a name')
      return
    }
    navigate(`/wishlists/${wishlist.name}`, { state: wishlist })
  }

  //handle name edit button
  const handleEditClick = async (e) => {
    const editButton = e.target

    if (!editing) {
      editButton.textContent = 'Save'
    } else {
      if (wishlist.name !== originalWishlist.name) {
        console.log('Save only if changed')
        await wishlistsService.updateWishlist(wishlist)
        setOriginalWishlist(wishlist)
      }
      editButton.textContent = 'Edit name'
    }
    setEditing(!editing)
  }

  //handle name change
  const handleNameChange = (e) => {
    const newName = { ...wishlist, name: e.target.value }
    setWishlist(newName)
  }

  //handle wishlist deletion
  const handleDeleteWishlist = async () => {
    const updatedWishlists = props.wishlists.filter((w) => w.id !== wishlist.id)
    props.setWishlists(updatedWishlists)
    await wishlistsService.deleteWishlist(wishlist.id)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={wishlist.name}
          readOnly={!editing}
          onChange={handleNameChange}
        />
        <button onClick={(e) => handleEditClick(e)}>Edit Name</button>
      </div>
      <p>Total cost: ${wishlist.total}</p>
      <button onClick={(e) => handleWishlistClick(e, wishlist)}>
        See List
      </button>
      <button onClick={handleDeleteWishlist}>Delete</button>
    </div>
  )
}

export default WishlistButton
