import { configureStore } from '@reduxjs/toolkit'
import wishlistLinkReducer from './reducers/wishlistLinkReducer'
import categoryLinkReducer from './reducers/categoryLinkReducer'

const store = configureStore({
  reducer: {
    wishlistLink: wishlistLinkReducer,
    categoryLink: categoryLinkReducer,
  },
})

export default store
