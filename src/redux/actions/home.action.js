
import { getHomeDataSuccess,getLocationSuccess } from '../reducers/home.data.reducer'
import {API} from '../../services/http.base';
export const getHomeData = () => async dispatch => {
  try {
  let data=await API.get("/api/home_data");
  
  dispatch(getHomeDataSuccess(data))
  
  }
    
   catch (e) {
     console.log(e.message);
  }
}

export const getLocation = () => async dispatch => {
  try {
  let data=await API.get("/api/location");
  
  dispatch(getLocationSuccess(data.location))
  
  }
    
   catch (e) {
     console.log(e.message);
  }
}





