import { createSlice } from '@reduxjs/toolkit'

const initialState = null

//setup notification reducer
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

//set notification dispatcher that controls notification state.
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(hideNotification()), time * 1000)
  }
}
export default notificationSlice.reducer
