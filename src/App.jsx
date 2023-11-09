import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route } from 'react-router-dom'
import AuthenticationGuard from './components/AuthenticationGuard'
import Signup from './components/Signup'
import CallbackView from './views/Callback'
import PageLayout from './components/PageLayout'
import CategoryView from './views/Category'
import HomeView from './views/Home'
import LoginView from './views/Login'
import WishlistView from './views/Wishlist'
import NotFoundView from './views/NotFound'
import TermsAndConditionsView from './views/TermsAndConditions'
import PrivacyPolicyView from './views/PrivacyPolicy'

const App = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <PageLayout />
  }

  //App sets up the routes for the allowed paths.
  return (
    <Routes>
      <Route
        path="/category/:id"
        element={<AuthenticationGuard component={CategoryView} />}
      />
      <Route
        path="/wishlists/:id"
        element={<AuthenticationGuard component={WishlistView} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/callback" element={<CallbackView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/" element={<HomeView />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsView />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicyView />} />
      <Route
        path="*"
        element={<AuthenticationGuard component={NotFoundView} />}
      />
    </Routes>
  )
}

export default App
