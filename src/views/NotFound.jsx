import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

const NotFoundView = () => {
  const navigate = useNavigate()
  setTimeout(() => navigate('/'), 3000)
  return (
    <PageLayout>
      <h1>Page Not Found</h1>
    </PageLayout>
  )
}

export default NotFoundView
