import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import auth from '../reducers/auth.reducer'
import home from '../reducers/home.data.reducer'
const reducer = combineReducers({
  auth,
  home
})
const store = configureStore({
  reducer,
})
export default store;