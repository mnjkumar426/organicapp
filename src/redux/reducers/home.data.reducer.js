import { createSlice } from '@reduxjs/toolkit'
// Slice
const homeSlice = createSlice({
  name: 'homeData',
  initialState: {
    categories: [],
    
  },
  reducers: {
    getHomeDataSuccess: (state, action) => {
      state.categories = action.payload.categories;
      
    }
    
  },
});
export default homeSlice.reducer
export const {getHomeDataSuccess}=homeSlice.actions