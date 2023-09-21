import { useState, useEffect } from 'react'
import itemsService from '../services/items'
import Item from './Item'

const Wishlist = () => {
  //control items state using useState
  const [originalItems, setOriginalItems] = useState(null)
  const [items, setItems] = useState(null)

  //This useEffect get the items from the backend and assigns them to items state on render
  useEffect(() => {
    const getItems = async () => {
      const initialItems = await itemsService.getAll()
      setItems(initialItems)
      setOriginalItems(initialItems)
    }

    getItems()
  }, [])

  if (!items) {
    return
  }

  //addEmptyRow function adds an item row to the array
  const addEmptyRow = async () => {
    const wishlistId = items[0].wishlist.id
    const newItem = {
      name: '',
      url: '',
      price: '',
      wishlist: wishlistId,
    }

    //Save empty item to the database
    const saveItem = await itemsService.addItem(newItem)
    console.log(saveItem)
    const newItems = items.concat(saveItem)
    setItems(newItems)
  }

  console.log(items === originalItems)

  //saveList function compare current items in wishlist with previous items and save changed items
  const saveList = () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i] !== originalItems[i]) {
        itemsService.updateItem(items[i])
        console.log('making a request for this item', items[i])
      }
    }

    if (items === originalItems) {
      console.log('items are the same')
    } else {
      setOriginalItems(items)
    }
  }

  console.log(items)

  //Get the name of the wishlist and the total price
  const wishlistName = items[0].wishlist.name
  const total = items.reduce((sum, item) => sum + Number(item.price), 0)

  return (
    <div>
      <h2>{wishlistName}</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} items={items} setItems={setItems} />
        ))}
      </ul>
      <button onClick={addEmptyRow}>Add Item</button>
      <button onClick={saveList}>Save List</button>
      <p>Total: {total}</p>
    </div>
  )
}

export default Wishlist