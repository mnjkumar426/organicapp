import React from 'react';
import { View,StyleSheet } from 'react-native';
import { PRODUCTS } from '../../constants/constant';
import { Product } from './product';
import { LEFT_MARGIN } from '../../styles/size';
export  function ProductGrid(props) {
  console.log(props.navigation)
    return (
        <View style={{flexDirection: 'row',flexWrap: 'wrap',padding:20,alignItems: 'flex-start' }}>
        {PRODUCTS.map((item,i)=>{ return(<Product key={i} style={{width:"50%",padding:5}} data={item}></Product>)})}
      </View>


    );
}

const styles = StyleSheet.create({
    
});