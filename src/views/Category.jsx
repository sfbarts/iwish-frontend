import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageLayout from '../components/PageLayout'
import Wishlists from '../components/Wishlists'
import Notification from '../components/Notification'
import Breadcrumbs from '../components/navigation/desktop/Breadcrumbs'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'

//CategoryView is used to see all the wishlists in a page.
const CategoryView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setWishlistLink({ name: '', path: '' }))
  })

  return (
    <PageLayout>
      <Breadcrumbs />
      <Notification />
      <Wishlists />
    </PageLayout>
  )
}

export default CategoryView
