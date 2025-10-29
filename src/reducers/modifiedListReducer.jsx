import { createSlice } from '@reduxjs/toolkit'
import itemsService from '../services/items'

//Setup modifiedList reducer. Keeps track of the modified items in a list.
const modifiedListSlice = createSlice({
  name: 'modifiedList',
  initialState: {},
  reducers: {
    setModifiedList(state, action) {
      const id = action.payload.id
      state[id] = action.payload
      return state
    },
    resetModifiedList(state) {
      return {}
    },
  },
})

export const { setModifiedList, resetModifiedList } = modifiedListSlice.actions
export default modifiedListSlice.reducer

export const saveWishlist = (accessToken) => {
  return async (dispatch, getState) => {
    const state = getState().modifiedList
    const itemsToSave = Object.values(state)
    if (itemsToSave.length) {
      await itemsService.updateItems(accessToken, itemsToSave)
      dispatch(resetModifiedList())
    }
  }
}
