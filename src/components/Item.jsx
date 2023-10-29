import { useState, useEffect } from 'react'
import itemsService from '../services/items'

const Item = ({ item, items, setItems, accessToken }) => {
  //newItem state now controls the inputs of each item
  //originalItem handles the item that is on the wishlist
  const [originalItem, setOriginalItem] = useState({})
  const [newItem, setNewItem] = useState(null)

  //Set items on every time the items being rendered change
  useEffect(() => {
    setNewItem({ ...item, price: item.price > 0 ? item.price : '' })
    setOriginalItem(item)
  }, [item])

  //only render once newItem has beens set
  if (!newItem) {
    return
  }

  //addToItems function allows for modifications of the wishlists items which allow for an accurate total
  const addToItems = (updatedItem) => {
    if (updatedItem !== originalItem) {
      const newItems = items.map((item) =>
        item.id !== updatedItem.id ? item : updatedItem
      )
      setItems(newItems)
      setOriginalItem(updatedItem)
    }
  }

  //All handle functions update the state of the inputs
  const handleNameUpdate = (e) => {
    const newName = { ...newItem, name: e.target.value }
    setNewItem(newName)
  }

  const handleUrlUpdate = (e) => {
    const newUrl = { ...newItem, url: e.target.value }
    setNewItem(newUrl)
  }

  const handlePriceUpdate = (e) => {
    const newPrice = e.target.value
    setNewItem({ ...newItem, price: newPrice })
    addToItems({ ...newItem, price: newPrice })
  }

  const handleAcquiredUpdate = (e) => {
    const newAcquired = { ...newItem, acquired: e.target.checked }
    setNewItem(newAcquired)
    addToItems(newAcquired)
  }

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
      />
      <input
        className="input-item regular"
        type="text"
        value={newItem.url}
        onChange={handleUrlUpdate}
        onBlur={() => addToItems(newItem)}
      />
      <input
        className="input-item regular item-price"
        type="number"
        value={newItem.price}
        onChange={handlePriceUpdate}
        placeholder="0.0"
      />
      <input
        className="checkbox"
        type="checkbox"
        value="acquired"
        onChange={handleAcquiredUpdate}
        checked={newItem.acquired}
      />
      <div className="trash-icon">
        <ion-icon onClick={handleRemoveItem} name="trash"></ion-icon>
      </div>
    </>
  )
}

export default Item
