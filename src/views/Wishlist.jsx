import PageLayout from '../components/PageLayout'
import Wishlist from '../components/Wishlist'
import Breadcrumbs from '../components/navigation/desktop/Breadcrumbs'

const WishlistView = () => {
  return (
    <PageLayout>
      <Breadcrumbs />
      <Wishlist />
    </PageLayout>
  )
}

export default WishlistView
