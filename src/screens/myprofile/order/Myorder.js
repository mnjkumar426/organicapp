import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import AppStyle from '../../../styles/style'


import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { IOCN_COLOR, PRIMARY_COLOUR } from '../../../styles/colors';
import { ICON_SIZE } from '../../../styles/size';
import { NAVIGATION } from '../../../constants/navigation';
import { API } from '../../../services/http.base';



export const MyOrder = () => {
  
  const navigation = useNavigation()
  const [orders,setOrders]=useState([]);
  
  const getOrders=async()=>{
    try {
      let orders=await API.get('order/getUserOrder');
      console.log("order",orders);
      if(orders && orders.status){
        setOrders(orders.orders);
       
      }
    } catch (error) {
      console.log("error",error)
    }
    


  }
  useEffect(() => {
    getOrders();
  },
    [])


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>My Order</Text>
        <TouchableOpacity onPress={() => {
          
        }}>
         
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {
          orders.map((order)=>{
            return (
              <View style={{flexDirection:'row'}}>
                
                
              </View>
            )
          })
        }
        
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
