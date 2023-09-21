import { useState } from 'react'

const Item = ({ item }) => {
  //States to control the inputs of each item
  const [name, setName] = useState(item.name)
  const [url, setUrl] = useState(item.url)
  const [price, setPrice] = useState(item.price)
  const [acquired, setAcquired] = useState(false)

  //All handle functions update the state of the inputs
  const handleNameUpdate = (e) => {
    setName(e.target.value)
  }

  const handleUrlUpdate = (e) => {
    setUrl(e.target.value)
  }

  const handlePriceUpdate = (e) => {
    setPrice(e.target.value)
  }

  const handleAcquiredUpdate = (e) => {
    setAcquired(e.target.checked)
  }

  return (
    <li>
      <input type="text" value={name} onChange={handleNameUpdate} />
      <input type="text" value={url} onChange={handleUrlUpdate} />
      <input type="text" value={price} onChange={handlePriceUpdate} />
      <input type="checkbox" value="acquired" onChange={handleAcquiredUpdate} />
    </li>
  )
}

export default Item
