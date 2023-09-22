import Wishlist from './components/Wishlist'
import Wishlists from './components/Wishlists'
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
        <Route path="/wishlists" element={<Wishlists />} />
        <Route path="/wishlists/:id" element={<Wishlist />} />
      </Routes>
    </Router>
  )
}

export default App
