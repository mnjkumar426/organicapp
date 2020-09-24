import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import { Product } from './product';
export  function HorizontalProductScroll(props) {
    return (
        <ScrollView horizontal={true}
          style={styles.horizontal}
          showsHorizontalScrollIndicator={false}
        >
            {props.products.map((item,i)=>{ return(<Product key={i} data={item} style={{width:"28%"}} ></Product>)})}
          
        </ScrollView>


    );
}

const styles = StyleSheet.create({
});