import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageLayout from '../components/PageLayout'
import Wishlists from '../components/Wishlists'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'

const CategoryView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setWishlistLink({ name: '', path: '' }))
  })

  return (
    <PageLayout>
      <Wishlists />
    </PageLayout>
  )
}

export default CategoryView
