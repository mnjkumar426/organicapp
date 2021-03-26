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



export const OrderSuccess = () => {
  const { auth, cart } = useSelector(state => state);
  const navigation = useNavigation()
  const route=useRoute();
  const dispatch = useDispatch();
useEffect(()=>{
  console.log(route)
})


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity> */}
        <Text style={styles.title}>Success</Text>

      </View>
      <ScrollView style={{ flex: 1 }}>
        
        <Card>
     <Card.Content>
       <Text>Order Success </Text>
       <Text>Order Id: {route?.params.order.id}</Text>


      
    </Card.Content>
        </Card>

       

  <Button  mode="contained" onPress={() => {
  navigation.navigate(NAVIGATION.HOME,{screen:'home'})
  }
  }>
    Back Home
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
