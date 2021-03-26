import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'cart',
  initialState: {
    carts:[],
    products:[],
    regularPriceTotal:0,
    salePriceTotal:0

  },


  reducers: {
    addToCartServerSuccess:(state,action)=>{
         return {...state,carts:action.payload.carts,regularPriceTotal:action.payload.regularPriceTotal,salePriceTotal:action.payload.salePriceTotal,products:action.payload.products}
    },
    clearCart:(state,action)=>{
      return {...state,carts:[],products:[],regularPriceTotal:0,salePriceTotal:0}
 },
    addToCart: (state, action) => {
      let find = state.carts.some((item) => item.item.id == action.payload.item.id);

      if (!find) {
        state.carts.push({
          item: action.payload.item,
          qty: 1
        })
        state.cartTotal+=Number(action.payload.item.price);
        state.totalSale+=action.payload.item.sale_price?Number(action.payload.item.sale_price):0
      }


    },

    addQtyTOCart: (state, action) => {

      return {
        ...state,
      cartTotal:state.cartTotal+Number(action.payload.item.price),
    totalSale:state.totalSale+(action.payload.item.sale_price?Number(action.payload.item.sale_price):0),
        carts: state.carts.map(cart =>
          {
          if(cart.item.id === action.payload.item.id)
             {
              
              return{
              ...cart,
              qty: cart.qty + action.payload.qty
              }
            }else{
              return cart
            }
           
          }
        ),

      }

    },

    removeQtyTOCart: (state, action) => {

      return {
        ...state,
        cartTotal:state.cartTotal-Number(action.payload.item.price),
        totalSale:state.totalSale-(action.payload.item.sale_price?Number(action.payload.item.sale_price):0),
        carts: state.carts.map(cart =>{
         if(cart.item.id === action.payload.item.id)
         {
         
            return {
              ...cart,
              qty: cart.qty - action.payload.qty
            }
          }else{
            return cart;
          }
            
          }
        ).filter(cart => {
          return cart.qty != 0;
        })

      }

    }
  },



});

export default slice.reducer
export const { addToCart, addQtyTOCart, removeQtyTOCart,addToCartServerSuccess,clearCart } = slice.actions