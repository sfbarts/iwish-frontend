import { createSlice, createSelector } from '@reduxjs/toolkit'
import wishlistsService from '../services/wishlists'

//Setup wishlist reducer. Keeps track of all the items in a list.
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { info: {}, items: {} },
  reducers: {
    initializeWishlist(state, action) {
      state['info'] = action.payload.info
      action.payload.items.forEach((item) => (state['items'][item.id] = item))
    },
    updateWishlist(state, action) {
      const id = action.payload.id
      state['items'][id] = action.payload
    },
    deleteItem(state, action) {
      delete state['items'][action.payload]
    },
    resetWishlist(state) {
      state.info = {}
      state.items = {}
    },
  },
})

export const { initializeWishlist, updateWishlist, deleteItem, resetWishlist } =
  wishlistSlice.actions

const wishlistState = (state) => state.wishlist

export const selectWishlist = createSelector([wishlistState], (wishlist) => {
  return {
    info: wishlist.info,
    items: Object.values(wishlist.items),
  }
})
export default wishlistSlice.reducer

export const retrieveWishlist = (accessToken, wishlistId) => {
  return async (dispatch) => {
    const initialWishlist = await wishlistsService.getWishlist(
      accessToken,
      wishlistId
    )
    dispatch(
      initializeWishlist({
        info: initialWishlist.info,
        items: initialWishlist.items,
      })
    )
  }
}
