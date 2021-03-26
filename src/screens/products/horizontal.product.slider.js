import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import { Product } from './product';
export  function HorizontalProductScroll(props) {
    return (
        <ScrollView horizontal={true}
          style={styles.horizontal}
          showsHorizontalScrollIndicator={false}
        >
            {props.products.map((item,i)=>{ return(<Product key={i} data={item}style={{width:(Dimensions.get('window').width/2-30), margin:10}} ></Product>)})}
          
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    // horizontal:{
    //     width:Dimensions.get('window').width
    // }
});