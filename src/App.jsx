import Wishlist from './components/Wishlist'
import Wishlists from './components/Wishlists'
import Categories from './components/Categories'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category/:id" element={<Wishlists />} />
        <Route path="/wishlists/:id" element={<Wishlist />} />
        <Route path="/" element={<Categories />} />
      </Routes>
    </Router>
  )
}

export default App
