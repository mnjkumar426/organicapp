import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import AppStyle from '../../styles/style'


import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { IOCN_COLOR, PRIMARY_COLOUR } from '../../styles/colors';
import { ICON_SIZE } from '../../styles/size';
import { NAVIGATION } from '../../constants/navigation';
import { ProductGrid } from '../products/productgid';
import { get_cart } from '../../redux/actions/cart.action';



export const Basket = () => {
  const { auth, cart } = useSelector(state => state);
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart())

  },
    [])


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Review Basket</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate({ name: NAVIGATION.SEARCH })
        }}>
          <Icon name='magnify' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <ProductGrid products={cart.products} layout="full"></ProductGrid>
      </ScrollView>
      <View style={{ flexDirection: 'row', backgroundColor: "#333", padding: 10, paddingEnd: 30, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}> Rs {cart?.regularPriceTotal}</Text>
          <Text style={{ color: PRIMARY_COLOUR, fontWeight: '600', fontSize: 16 }}>Saved Rs {(cart?.regularPriceTotal - cart?.salePriceTotal)}</Text>
        </View>
        <View style={{ justifyContent: 'center' }} >
          <TouchableOpacity style={{ ...AppStyle.button, paddingEnd: 20, paddingStart: 20 }} onPress={()=>{
             navigation.navigate({ name: NAVIGATION.ADDRESS })
          }
            
          } >
            <Text style={{ color: 'white' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
};

;

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  title: {
    fontSize: 18,
    color: IOCN_COLOR
  }
});
