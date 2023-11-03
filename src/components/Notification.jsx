import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

const Notification = () => {
  const navigate = useNavigate()
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  } else if (notification.type === 'axiosError') {
    setTimeout(() => navigate('/'), 3000)
    return (
      <Alert severity="error" id="notification">
        {notification.message}
      </Alert>
    )
  } else if (notification.type === 'warning') {
    return (
      <Alert severity="warning" id="notification">
        {notification.message}
      </Alert>
    )
  } else {
    return (
      <Alert severity="error" id="notification">
        {notification.message}
      </Alert>
    )
  }
}

export default Notification
