import { useState } from 'react'
import { Link } from 'react-router-dom'
import wishlistsService from '../services/wishlists'
import Tooltip from './CustomTooltip'

const WishlistButton = (props) => {
  //originalWishlist handles original states to compare if changes have been made
  //wishlist state handles the wishlist
  //Name handles the state for updating
  const [originalWishlist, setOriginalWishlist] = useState(props.wishlist)
  const [wishlist, setWishlist] = useState(props.wishlist)
  const [editing, setEditing] = useState(false)
  const [editTooltipTitle, setEditTooltipTitle] = useState('Edit name')

  //only render when there are wishlists
  if (!wishlist) {
    return
  }

  //handle name edit button
  const handleEditClick = async (e) => {
    const editButton = e.target

    if (!editing) {
      editButton.name = 'save'
      setEditTooltipTitle('Save name')
    } else {
      if (wishlist.name !== originalWishlist.name) {
        await wishlistsService.updateWishlist(props.accessToken, wishlist)
        setOriginalWishlist(wishlist)
      }
      editButton.name = 'pencil-outline'
      setEditTooltipTitle('Edit name')
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
    await wishlistsService.deleteWishlist(props.accessToken, wishlist.id)
  }

  return (
    <div className="card card__wishlist">
      <div className="card-icon delete-icon">
        <Tooltip title="Delete wishlist">
          <ion-icon
            onClick={handleDeleteWishlist}
            name="close-circle-outline"
          ></ion-icon>
        </Tooltip>
      </div>
      <div className="card-name-container">
        {!editing ? (
          <p className="card-name upper bold medium">{wishlist.name}</p>
        ) : (
          <input
            className="input-name input-name__wishlist medium"
            type="text"
            value={wishlist.name}
            onChange={handleNameChange}
            maxLength={50}
            autoFocus
          />
        )}
        <div className="card-icon edit-icon">
          <Tooltip title={editTooltipTitle}>
            <ion-icon
              onClick={(e) => handleEditClick(e)}
              name="pencil-outline"
            ></ion-icon>
          </Tooltip>
        </div>
      </div>
      <p className="medium">${wishlist.total}</p>
      <Tooltip title="Open wishlist">
        <Link className="card-icon" to={`/wishlists/${wishlist.id}`}>
          <ion-icon name="eye"></ion-icon>
        </Link>
      </Tooltip>
    </div>
  )
}

export default WishlistButton
