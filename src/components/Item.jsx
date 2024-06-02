import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch } from 'react-redux'
import { setModifiedList } from '../reducers/modifiedListReducer'
import { updateWishlist, deleteItem } from '../reducers/wishlistReducer'
import itemsService from '../services/items'
import Tooltip from './CustomTooltip'

const Item = ({ item, accessToken }) => {
  //newItem state now controls all the inputs of each item
  const [newItem, setNewItem] = useState({
    ...item,
    price: item.price > 0 ? item.price : '',
  })

  const dispatch = useDispatch()

  //only render once newItem has beens set
  if (!newItem) {
    return
  }

  // handleChangeUpdate() triggers whenever a change is made on the item.
  // It currently updates the item state and dispatches the item to the modifiedItems reducer.
  const handleChangeUpdate = (e) => {
    const { name, value, checked } = e.target

    const updatedItem = {
      ...newItem,
      [name]: name !== 'acquired' ? value : checked,
    }

    setNewItem(updatedItem)
    dispatch(setModifiedList(updatedItem))
    if (name === 'price' || name === 'acquired') {
      dispatch(updateWishlist(updatedItem))
    }
  }

  //handleRemoveItem removes item from database.
  const handleRemoveItem = async () => {
    dispatch(deleteItem(newItem.id))
    await itemsService.deleteItem(accessToken, newItem.id)
  }

  return (
    <>
      <input
        className="input-item regular"
        type="text"
        name="name"
        value={newItem.name}
        onChange={handleChangeUpdate}
        maxLength={100}
      />
      <input
        className="input-item regular"
        type="text"
        name="url"
        value={newItem.url}
        onChange={handleChangeUpdate}
        maxLength={400}
      />
      <input
        className="input-item regular item-price"
        type="number"
        name="price"
        value={newItem.price}
        onChange={handleChangeUpdate}
        placeholder="0.0"
      />
      <Checkbox
        name="acquired"
        onChange={handleChangeUpdate}
        checked={newItem.acquired}
        sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'white',
          },
          '& .MuiSvgIcon-root': { fontSize: 24 },
          '&:hover': { background: '#f3e5f509' },
        }}
      />
      <Tooltip placement="right" title="Delete item">
        <div className="trash-icon">
          <ion-icon onClick={handleRemoveItem} name="trash"></ion-icon>
        </div>
      </Tooltip>
    </>
  )
}

export default Item
