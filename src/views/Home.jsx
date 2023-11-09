import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Categories from '../components/Categories'
import Notification from '../components/Notification'
import Breadcrumbs from '../components/navigation/desktop/Breadcrumbs'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'

//HomeView is the page where all categories are rendered in the structured page.
const HomeView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      dispatch(setCategoryLink({ name: '', path: '' }))
      dispatch(setWishlistLink({ name: '', path: '' }))
    }
  }, [])

  return (
    <PageLayout>
      <Breadcrumbs />
      <Notification />
      <Categories />
    </PageLayout>
  )
}

export default HomeView
