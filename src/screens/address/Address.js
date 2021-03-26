import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { IOCN_COLOR, PRIMARY_COLOUR } from '../../styles/colors';
import { ICON_SIZE } from '../../styles/size';
import { NAVIGATION } from '../../constants/navigation';
import { API } from '../../services/http.base';
import { BOX_SHADDOW } from '../../styles/boxshaddow';
import { RadioButton, Title } from 'react-native-paper';
export const Address = () => {
  const { auth } = useSelector(state => state);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [address,setAddress]=useState([]);
  const [value, setValue] = React.useState();
  const [checked, setChecked] = React.useState('');
  const getAddress=async()=>{
      try {
          let address=await API.get("user/profile/address");
          if(address && address.status){
              setAddress(address.address)
          console.log("addresss",address)
          }
      } catch (error) {
          
      }
  }

  useEffect(() => {
    getAddress();
  },
    [])


  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Choose Delivery Address</Text>
        
      </View>
      <View >
        <TouchableOpacity onPress={() => { navigation.navigate({ name: NAVIGATION.NEW_ADDRESS }) }} >
            <Text style={{alignSelf: 'flex-end',padding:10,textTransform:"capitalize",color:"blue"}} >+ add new address</Text>
        </TouchableOpacity> 
      </View>
      <ScrollView style={{ flex: 1 }}>
          <>
          <RadioButton.Group onValueChange={
              (newValue) => {
                  setValue(newValue);

                   navigation.navigate({ name: NAVIGATION.PAYMENT,params:{deliveryAddress:newValue} }) ;
                  
                }
            
            } 
            value={value}
          >
          {
          address.map((a)=>{
           return (       
               
        <TouchableOpacity style={{ ...styles.box,flexDirection:"row"}} onPress={()=>{
              setValue(a.id)
        }}>
         <RadioButton value={a.id}  status={(a.default )?'checked':"unchecked"} />

         <View style={{flexDirection:'column'}}>
                <Title >{a.default?<Text >Default Address</Text>:a.nickName}</Title>
                <Text>{a.firstName} {a.lastName}</Text>
                <Text>{a.houseNo},{a.apartmentName}</Text>
                <Text>{a.street}</Text>
                <Text>{a.area} {a.addLocation?.title} - {a.pinCode}</Text>
                <Text>Ph : {a.mobile} </Text>
        </View>
       
     
            </TouchableOpacity>
           )
          })
          }
          </RadioButton.Group>
          </>
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
    
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  title: {
    fontSize: 18,
    color: IOCN_COLOR
  },
  box: {
    ...BOX_SHADDOW,
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderRadius: 0,


    elevation: 3,
    padding: 10,
    maxHeight: "100%",
    marginBottom:2

},

});
