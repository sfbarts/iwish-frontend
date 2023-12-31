import { createSlice } from '@reduxjs/toolkit'

const initialState = { name: '', path: '' }

//Setup category link reducer for breadcrumbs.
const categoryLinkSlice = createSlice({
  name: 'categoryLink',
  initialState,
  reducers: {
    setCategoryLink(state, action) {
      return action.payload
    },
  },
})
export const { setCategoryLink } = categoryLinkSlice.actions
export default categoryLinkSlice.reducer
