
import { loginSuccess, logoutSuccess } from '../reducers/auth.reducer'
export const login = ({ username, password }) => async dispatch => {
  try {
    console.log("username",username)
    // const res = await api.post('/api/auth/login/', { username, password })
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