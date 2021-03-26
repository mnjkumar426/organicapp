import { createSlice } from '@reduxjs/toolkit'
import { Initialstate } from '../../constants/initialstate';
// Slice
import {AsyncStorage} from 'react-native'
import { INITIALSTATE } from '../../constants/constant';
const updatelocalState=async(state)=>{
   await AsyncStorage.setItem(INITIALSTATE,JSON.stringify(state));
}
const authSlice = createSlice({
  name: 'user',
  initialState:Initialstate,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogin=true
      updatelocalState(state)
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.isLogin=false
      state.errorMessage=action.payload
      updatelocalState(state)
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
      state.isLogin=false
      state.defaultLocation=null
      updatelocalState(state);
    },
    setDefaultLocation: (state, action) =>  {

      state.defaultLocation = action.payload;
      updatelocalState(state);
      

    },
    setinitialState: (state, action) =>  {
      //console.log("pa",action.payload.defaultLocation,action.payload)
     state.defaultLocation=action.payload.defaultLocation
     state.isLogin=action.payload.isLogin;
     state.user=action.payload.user;
    
     
    },
  },
});
export default authSlice.reducer
export const {loginSuccess,logoutSuccess,setDefaultLocation,setinitialState}=authSlice.actions