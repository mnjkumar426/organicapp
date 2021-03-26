import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import auth from '../reducers/auth.reducer'
import home from '../reducers/home.data.reducer'
import subCat from '../reducers/subcat.reducer'
import loading from '../reducers/loading.reducer'
import cart from '../reducers/cart.reducer'
//import apiMiddleWare from './middleware'
//import { getDefaultMiddleware } from '@reduxjs/toolkit'
const
 reducer = combineReducers({
  auth,
  home,
  subCat,
  loading,
  cart
  


})
const store = configureStore({
  reducer,
 } )
export default store;