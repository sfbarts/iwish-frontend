import { createSlice } from '@reduxjs/toolkit'

const initialState = { name: '', path: '' }

//Setup wishlist link reducer for breadcrumbs
const wishlistLinkSlice = createSlice({
  name: 'wishlistLink',
  initialState,
  reducers: {
    setWishlistLink(state, action) {
      return action.payload
    },
  },
})
export const { setWishlistLink } = wishlistLinkSlice.actions
export default wishlistLinkSlice.reducer
