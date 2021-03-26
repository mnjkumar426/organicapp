
import { fetchCatSuccess } from '../reducers/subcat.reducer'
import {API} from '../../services/http.base';
export const getSubCatData =  (id) =>async dispatch=> {
try {
  let data=await API.get("/api/categories/"+id);
  dispatch(fetchCatSuccess(data))
  
  }
    
   catch (e) {
     console.log(e.message);
  }
 
}








