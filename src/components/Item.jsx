import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import itemsService from '../services/items'
import Tooltip from './CustomTooltip'

const Item = ({ item, items, setItems, accessToken }) => {
  //originalItem holds the original values for each item input
  const [originalItem, setOriginalItem] = useState({})
  //newItem state now controls all the inputs of each item
  const [newItem, setNewItem] = useState(null)

  //Set the item price input to be empty by default if it is 0
  //Save original item using item passed from Wishlist component
  useEffect(() => {
    setNewItem({ ...item, price: item.price > 0 ? item.price : '' })
    setOriginalItem(item)
  }, [item])

  //only render once newItem has beens set
  if (!newItem) {
    return
  }

  //Items state is updated if items have changed in order to keep list updated.
  const addToItems = (updatedItem) => {
    if (updatedItem !== originalItem) {
      const newItems = items.map((item) =>
        item.id !== updatedItem.id ? item : updatedItem
      )
      setItems(newItems)
      setOriginalItem(updatedItem)
    }
  }

  //handleNewName controls name input value and sets newItem state
  const handleNameUpdate = (e) => {
    const newName = { ...newItem, name: e.target.value }
    setNewItem(newName)
  }

  //handleUrlUpdate controls URL input value and sets newItem state
  const handleUrlUpdate = (e) => {
    const newUrl = { ...newItem, url: e.target.value }
    setNewItem(newUrl)
  }

  //handlePriceUpdate controls price input value and sets newItem state
  const handlePriceUpdate = (e) => {
    const newPrice = e.target.value
    setNewItem({ ...newItem, price: newPrice })
    addToItems({ ...newItem, price: newPrice })
  }

  //handleAcquiredUpdate controls acquired input value and sets newItem state
  const handleAcquiredUpdate = (e) => {
    const newAcquired = { ...newItem, acquired: e.target.checked }
    setNewItem(newAcquired)
    addToItems(newAcquired)
  }

  //handleRemoveItem removes item from database.
  const handleRemoveItem = async () => {
    const updatedItems = items.filter((item) => item.id !== newItem.id)
    setItems(updatedItems)
    await itemsService.deleteItem(accessToken, newItem.id)
  }

  return (
    <>
      <input
        className="input-item regular"
        type="text"
        value={newItem.name}
        onChange={handleNameUpdate}
        onBlur={() => addToItems(newItem)}
        maxLength={100}
      />
      <input
        className="input-item regular"
        type="text"
        value={newItem.url}
        onChange={handleUrlUpdate}
        onBlur={() => addToItems(newItem)}
        maxLength={400}
      />
      <input
        className="input-item regular item-price"
        type="number"
        value={newItem.price}
        onChange={handlePriceUpdate}
        placeholder="0.0"
      />
      <Checkbox
        onChange={handleAcquiredUpdate}
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
