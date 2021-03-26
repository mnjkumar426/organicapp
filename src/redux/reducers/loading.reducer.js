import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'loading',
  initialState: {loading:false},
  reducers: {
    startLoading: (state) => {
      return { ...state,
      loading:false
       }
    },
    stopLoading: (state) =>  {
        return { ...state,
            loading:false
    }
}
}
});
export default slice.reducer
export const {startLoading,stopLoading}=slice.actions