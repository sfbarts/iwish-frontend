import { configureStore } from '@reduxjs/toolkit'
import wishlistLinkReducer from './reducers/wishlistLinkReducer'
import categoryLinkReducer from './reducers/categoryLinkReducer'
import notificationReducer from './reducers/notificationReducer'
import modifiedListReducer from './reducers/modifiedListReducer'

//Create the redux store to manage reducers.
const store = configureStore({
  reducer: {
    wishlistLink: wishlistLinkReducer,
    categoryLink: categoryLinkReducer,
    notification: notificationReducer,
    modifiedList: modifiedListReducer,
  },
})

export default store
