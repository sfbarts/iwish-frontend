import { useState } from 'react'

const Item = ({ item, items, setItems }) => {
  //newItem state now controls the inputs of each item
  const [newItem, setNewItem] = useState({
    ...item,
  })

  //addToItems function allows for modifications of the wishlists items which allow for an accurate total
  const addToItems = (newItem) => {
    const newItems = items.map((item) =>
      item.id !== newItem.id ? item : newItem
    )
    setItems(newItems)
    console.log(newItems)
  }

  //All handle functions update the state of the inputs
  const handleNameUpdate = (e) => {
    const newName = { ...newItem, name: e.target.value }
    setNewItem(newName)
    addToItems(newName)
  }

  const handleUrlUpdate = (e) => {
    const newUrl = { ...newItem, url: e.target.value }
    setNewItem(newUrl)
    addToItems(newUrl)
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
      <input type="text" value={newItem.name} onChange={handleNameUpdate} />
      <input type="text" value={newItem.url} onChange={handleUrlUpdate} />
      <input type="text" value={newItem.price} onChange={handlePriceUpdate} />
      <input type="checkbox" value="acquired" onChange={handleAcquiredUpdate} />
    </li>
  )
}

export default Item
