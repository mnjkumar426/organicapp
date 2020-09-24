
import { getHomeDataSuccess } from '../reducers/home.data.reducer'
import Api from '../../services/http.base';
export const getHomeData = () => async dispatch => {
  try {
  let response=await Api.get('/wc/v3/products/categories');
  let categories= response.data;
  console.log("categories",categories)
  
  }
    
   catch (e) {
    return console.error(e.message);
  }
}
