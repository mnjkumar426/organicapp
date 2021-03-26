import axios from 'axios';
import { startLoading, stopLoading } from '../reducers/loading.reducer'
const apiMiddleware = ({ dispatch }) => next =>async action => {
   
    next(action);
//     if (action.type !== 'API') return;
    
//     dispatch(startLoading())

//     let service = axios.create({
//         baseURL:'http://192.168.1.102/demo/wp-json'
      
//     });
//     service.interceptors.response.use((res)=>{
//         if(action && action.dispatch)
//         {
//             dispatch(action.dispatch(res.data));
//         }
//         dispatch(stopLoading())
//         return res;

//     }, (error) => {
//         dispatch(stopLoading())
       
//         return Promise.reject(error)
//    });
    
   
//   console.log("API Call for ==========",action.endPoint);
    
//  service.get(action.endPoint);

      
}
export default apiMiddleware;