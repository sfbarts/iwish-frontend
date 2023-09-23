import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useParams } from 'react-router-dom'
import wishlistsService from '../services/wishlists'
import itemsService from '../services/items'
import Item from './Item'

const Wishlist = () => {
  const wishlistId = useParams().id

  //control items state using useState
  const [originalItems, setOriginalItems] = useState(null)
  const [items, setItems] = useState(null)
  const [wishlistName, setWishlistName] = useState('')

  const getWishlist = async () => {
    const initialName = await wishlistsService.getWishlist(wishlistId)
    setWishlistName(initialName.name)
  }

  const getItems = async () => {
    const initialItems = await itemsService.getAll(wishlistId)
    setItems(initialItems)
    setOriginalItems(initialItems)
  }

  //This useEffect get the items from the backend and assigns them to items state on render
  useEffect(() => {
    getWishlist()
    getItems()
  }, [])

  if (!items) {
    return
  }

  //addEmptyRow function adds an item row to the array
  const addEmptyRow = async () => {
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
  const saveList = async () => {
    //check if the lists are different and if so compare each item to one another. Then send a request for the changed items.
    if (items !== originalItems) {
      let changedItems = []
      for (let i = 0; i < items.length; i++) {
        if (items[i] !== originalItems[i]) {
          changedItems.push(items[i])
        }
      }
      const updateItems = await itemsService.updateItems(changedItems)
      getItems()
    } else {
      console.log('items are the same. No loop run.')
    }
  }

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
