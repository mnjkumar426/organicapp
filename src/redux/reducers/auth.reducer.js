import { createSlice } from '@reduxjs/toolkit'
// Slice
const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLogin:true
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogin=true
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
    },
  },
});
export default authSlice.reducer
export const {loginSuccess,logoutSuccess}=authSlice.actions