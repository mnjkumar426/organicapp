import React, { useEffect, useState } from 'react';
import { View,StyleSheet, Text } from 'react-native';
//import { PRODUCTS } from '../../constants/constant';
import { Product } from './product';
import { LEFT_MARGIN } from '../../styles/size';
import { NotFound } from '../NotFound';
export  function ProductGrid({products,layout}) {
  // const [productList,setProducts]=useState([]);
  // useEffect(()=>{
  //   setProducts(products)
  // },[products])

  
    return (
        <View style={{flexDirection: 'row',flexWrap: 'wrap',padding:20,alignItems: 'flex-start' }}>
          
        { products && products.length>0?products.map(
          (item,i)=>{ 
            
          return(
            <>
          {
            item?.productType=="simple"?
          <Product key={i} style={{width:layout && layout=='full'?"100%":"50%",padding:5}} data={item} layout={layout}></Product>
            : item?.variations?.map((variation)=>{
           return   (
      <Product key={variation.id} style={{width:layout && layout=='full'?"100%":"50%",padding:5}} data={variation} layout={layout}></Product>
         
            )})


          }
          </>
          )})
          
          :<NotFound></NotFound>}
      </View>


    );
}

const styles = StyleSheet.create({
    
});