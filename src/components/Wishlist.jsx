import { useState, useEffect } from 'react'
import itemsService from '../services/items'
import Item from './Item'

const Wishlist = () => {
  //control items state using useState
  const [items, setItems] = useState(null)

  //This useEffect get the items from the backend and assigns them to items state on render
  useEffect(() => {
    const getItems = async () => {
      const initialItems = await itemsService.getAll()
      setItems(initialItems)
    }

    getItems()
  }, [])

  if (!items) {
    return
  }

  //Get the name of the wishlist and the total price
  const wishlistName = items[0].wishlist.name
  const total = items.reduce((sum, item) => sum + Number(item.price), 0)

  console.log(total)

  return (
    <div>
      <h2>{wishlistName}</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  )
}

export default Wishlist
