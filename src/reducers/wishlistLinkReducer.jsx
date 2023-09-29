import { createSlice } from '@reduxjs/toolkit'

const initialState = { name: '', path: '' }

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
