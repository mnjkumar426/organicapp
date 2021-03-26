import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import AppStyle from '../../styles/style'


import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IOCN_COLOR, PRIMARY_COLOUR } from '../../styles/colors';
import { ICON_SIZE } from '../../styles/size';
import { NAVIGATION } from '../../constants/navigation';
import { Card, Paragraph, Title,Button } from 'react-native-paper';
import { API } from '../../services/http.base';
import { clearUserCart } from '../../redux/actions/cart.action';



export const Payment = () => {
  const { auth, cart } = useSelector(state => state);
  const navigation = useNavigation()
  const route=useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
   // dispatch(get_cart())

  },
    [])
    const createOrder=async()=>{
      try {
        let order=await API.post('order',{addressId:route?.params.deliveryAddress});
        console.log("order",order);
        if(order && order.status){
          dispatch(clearUserCart());
          navigation.navigate({ name: NAVIGATION.ORDER_SUCCESS,params:{order:order.order} }) ;
        }
      } catch (error) {
        console.log("error",error)
      }
      


    }


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>

      </View>
      <ScrollView style={{ flex: 1 }}>
        
        <Card>
     <Card.Content>
       <View style={{flexDirection:'column'}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Basket Value</Text>
              <Text>{cart.salePriceTotal}</Text>
           
    
         </View>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Delivery Charge</Text>
              <Text>{0}</Text>
         </View>

         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Title style={{fontSize:16}}>Total Amount Payable</Title>
              <Title style={{fontSize:16}}>{cart.salePriceTotal}</Title>
         </View>


       </View>
  
    </Card.Content>
        </Card>

        <Title>Payment Options</Title>

  <Button  mode="contained" onPress={() => {
  createOrder();
  }
  }>
    Order
  </Button>
      </ScrollView>
      


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
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,

    marginBottom:2
  },
  title: {
    fontSize: 18,
    color: IOCN_COLOR
  }
});
