import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageLayout from '../components/PageLayout'
import Categories from '../components/Categories'
import { setCategoryLink } from '../reducers/categoryLinkReducer'
import { setWishlistLink } from '../reducers/wishlistLinkReducer'

const HomeView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCategoryLink({ name: '', path: '' }))
    dispatch(setWishlistLink({ name: '', path: '' }))
  }, [])

  return (
    <PageLayout>
      <Categories />
    </PageLayout>
  )
}

export default HomeView
