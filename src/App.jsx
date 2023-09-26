import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import CallbackView from './views/Callback'
import CategoryView from './views/Category'
import HomeView from './views/Home'
import LoginView from './views/Login'
import WishlistView from './views/Wishlist'

const App = () => {
  return (
    <Routes>
      <Route path="/category/:id" element={<CategoryView />} />
      <Route path="/wishlists/:id" element={<WishlistView />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/callback" element={<CallbackView />} />
      <Route path="/" element={<HomeView />} />
      <Route path="/login" element={<LoginView />} />
    </Routes>
  )
}

export default App
