import { useState } from 'react'
import { Link } from 'react-router-dom'
import wishlistsService from '../services/wishlists'
import Tooltip from './CustomTooltip'

const WishlistButton = (props) => {
  //originalWishlist handles original states to compare if changes have been made
  const [originalWishlist, setOriginalWishlist] = useState(props.wishlist)
  //wishlist state handles the most uptodate wishlist
  const [wishlist, setWishlist] = useState(props.wishlist)
  //editing state is a boolean that helps us know if a category name is being edited in order to update name in DB and update icon.
  const [editing, setEditing] = useState(false)
  //editTooltipTitle controls the tooltip title of the category name edit icon.
  const [editTooltipTitle, setEditTooltipTitle] = useState('Edit name')

  //only render when there are wishlists
  if (!wishlist) {
    return
  }

  //handleEditClick handles the category name change
  //It changes the icons and tooltips by changing the button name and updating tooltip states.
  //If category name is different than original then save to DB when save button pressed.
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

  //handleNameChange updates category name when editing it.
  const handleNameChange = (e) => {
    const newName = { ...wishlist, name: e.target.value }
    setWishlist(newName)
  }

  //handleDeleteWishlist removes wishlist from DB and updates frontend.
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
        <Link
          className="card-icon"
          to={`/wishlists/${wishlist.id}`}
          state={{ wishlist }}
        >
          <ion-icon name="eye"></ion-icon>
        </Link>
      </Tooltip>
    </div>
  )
}

export default WishlistButton
