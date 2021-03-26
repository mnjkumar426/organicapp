
import { addQtyTOCart,addToCart,removeQtyTOCart,addToCartServerSuccess,clearCart } from '../reducers/cart.reducer'
import {API} from '../../services/http.base';
export const  add_to_cart= (item) => async dispatch => {
    console.log("item",item)
  try {
  let data=await API.post("/cart",item);
  //console.log("data",data.carts)
  if(data && data.carts ){
  return dispatch(addToCartServerSuccess(data))
  }
  
  }
    
   catch (e) {
     console.log(e);
  }
}

export const  remove_to_cart= (item) => async dispatch => {
  console.log("item",item)
try {
let data=await API.put("/cart",item);
//console.log("data",data.carts)
if(data && data.carts ){
return dispatch(addToCartServerSuccess(data))
}

}
  
 catch (e) {
   console.log(e);
}
}

export const  clearUserCart= () => async dispatch => {
 
return dispatch(clearCart())

}


export const  get_cart= () => async dispatch => {
  try {
  let data=await API.get("cart");
  if(data && data.status){
  return dispatch(addToCartServerSuccess(data))
  }
  
  }
    
   catch (e) {
     console.log(e);
  }
}








