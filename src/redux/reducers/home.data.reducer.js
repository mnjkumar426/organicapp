import { createSlice } from '@reduxjs/toolkit'
// Slice
const homeSlice = createSlice({
  name: 'homeData',
  initialState: {
    categories: [],
    banners:[],
    featured:[],
    location:[],
    
    
  },
  reducers: {
    getHomeDataSuccess: (state, action) => {
     
      return {
        ...state,
        categories:action.payload.categories,
        banners:action.payload.banner,
        featured:action.payload.featured.errors?[]:action.payload.featured,
        location:action.payload.location
      
      }
      
    },
    getLocationSuccess: (state, action) => {
     
      state.location=action.payload
      
    }
    
  },
});
export default homeSlice.reducer
export const {getHomeDataSuccess,getLocationSuccess}=homeSlice.actions