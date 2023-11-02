import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

const Notification = () => {
  const navigate = useNavigate()
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  } else if (notification.type === 'success') {
    return <Alert severity="success">{notification.message}</Alert>
  } else if (notification.type === 'axiosError') {
    setTimeout(() => navigate('/'), 3000)
    return <Alert severity="error">{notification.message}</Alert>
  } else {
    return <Alert severity="error">{notification.message}</Alert>
  }
}

export default Notification
