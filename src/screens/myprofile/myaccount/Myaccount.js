import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IOCN_COLOR, PRIMARY_COLOUR } from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../../../constants/navigation';
import { ScrollView } from 'react-native';
import { ICON_SIZE } from '../../../styles/size';
import { logout } from '../../../redux/actions/auth.action';


export  const  MyAccount = () => {
    const {auth}=useSelector(state=>state);
    const navigation=useNavigation();
    const dispatch=useDispatch();
    

    return (
      <ScrollView style={styles.container}>
          <View style = {
              {
                backgroundColor:PRIMARY_COLOUR,padding:10
              }
          }
          >
        <View style={{flexDirection:'row',
        

        }}>
                            <Avatar.Image 
                            style={{backgroundColor:'white'}}
                                source={{
                                    uri: ''
                                }}
                                size={50}
                                
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Text style={styles.title}>{auth.user?.name}</Text>
                            <Text style={styles.title}>{auth.user?.mobile}</Text>
                            
                                
                            </View>

        </View>  
        <View style={{flexDirection:'row',backgroundColor:"white",padding:10,marginTop:10,borderRadius:5}}>
                        
                            <Icon name='map-marker-outline'  size={25} color={IOCN_COLOR} />
                            
                            <Text style={{fontSize:18,flex:1}}>{auth.defaultLocation?.name}</Text>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate({name:NAVIGATION.LOCATION})
                            }}>
                            <Icon name='pencil'  size={25} color={IOCN_COLOR} ></Icon>
                            
                            </TouchableOpacity>
                            
                            
                                
         </View>                 
    </View>
    <View>
    <TouchableOpacity style={styles.menu} onPress={()=>{
      navigation.navigate(NAVIGATION.MYORDER)
    }}>
        <Icon name='history' size={ICON_SIZE}></Icon>
        <Text style={styles.menuTitle}>My Orders</Text>
    </TouchableOpacity>
    <View style={styles.menu}>
        <Icon name='credit-card-outline' size={ICON_SIZE}></Icon>
        <Text style={styles.menuTitle}>My Payments</Text>
    </View>
    <View style={styles.menu}>
        <Icon name='history' size={ICON_SIZE}></Icon>
        <Text style={styles.menuTitle}>My Payments</Text>
    </View>
    <View style={styles.menu}>
        <Icon name='map-marker-outline' size={ICON_SIZE}></Icon>
        <Text style={styles.menuTitle}>My Delivery Address</Text>
    </View>
    <TouchableOpacity style={styles.menu}
     onPress={()=>{
dispatch(logout())
     }}
    >
       
        <Icon name='logout' size={ICON_SIZE}></Icon>
        <Text style={styles.menuTitle}>Logout</Text>
        
    </TouchableOpacity>
    </View>
      </ScrollView>
    );
};

;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
   
    
  },
  title:{
      color:"#fff",
      textTransform:'capitalize'
  },
  menuTitle:{
paddingLeft:10
  }
  ,
  menu:{flexDirection:'row',alignContent:'center',
  backgroundColor:'white',padding:10,borderBottomColor:"#ddd",
  borderBottomWidth:1,alignItems:'center'
}
});
