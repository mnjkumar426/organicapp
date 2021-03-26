import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'catData',
  initialState: {
    subCats: [],
    products:[]
    
    
    
  },
  reducers: {
    fetchCatSuccess: (state, action) => {
     
      return {
        ...state,
        subCats:action.payload.categories,
        products:action.payload.products
      
      }
      
    }
    
  },
});
export default slice.reducer
export const {fetchCatSuccess}=slice.actions