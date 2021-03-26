
import { loginSuccess, logoutSuccess } from '../reducers/auth.reducer'
import {API} from '../../services/http.base';  
export const login = ({ mobile }) => async dispatch => {
  try {
    
    dispatch(loginSuccess({isLogin:false,user:{username}}));
  } catch (e) {
    return console.error(e.message);
  }
}
export const logout = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}

export const sendOtp =  ( mobile ) =>{
 return API.get('/user/sendOtp/'+mobile);
    
}

export const verifyOtp =  ( mobile,otp ) =>{
  return API.login(mobile,otp);
     
 }
 