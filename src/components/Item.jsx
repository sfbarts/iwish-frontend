import { useState } from 'react'

const Item = ({ item, items, setItems }) => {
  //newItem state now controls the inputs of each item
  //originalItem handles the item that is on the wishlist
  const [originalItem, setOriginalItem] = useState(item)
  const [newItem, setNewItem] = useState(item)

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
    const newPrice = { ...newItem, price: Number(e.target.value) }
    setNewItem(newPrice)
    addToItems(newPrice)
  }

  const handleAcquiredUpdate = (e) => {
    const newAcquired = { ...newItem, acquired: e.target.checked }
    setNewItem(newAcquired)
    addToItems(newAcquired)
  }

  return (
    <li>
      <input
        type="text"
        value={newItem.name}
        onChange={handleNameUpdate}
        onBlur={() => addToItems(newItem)}
      />
      <input
        type="text"
        value={newItem.url}
        onChange={handleUrlUpdate}
        onBlur={() => addToItems(newItem)}
      />
      <input type="text" value={newItem.price} onChange={handlePriceUpdate} />
      <input
        type="checkbox"
        value="acquired"
        onChange={handleAcquiredUpdate}
        checked={item.acquired}
      />
    </li>
  )
}

export default Item
