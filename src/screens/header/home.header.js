import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOUR, SECONDARY_BG, PRIMARY_BG, LIGHT_COLOUR, IOCN_COLOR } from '../../styles/colors';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { ICON_SIZE } from '../../styles/size';
import { NAVIGATION } from '../../constants/navigation';
import { useNavigation } from '@react-navigation/native';
import { SearchInput } from './search.header';
import { useSelector } from 'react-redux';
const   Header=()=> {
  const navigation=useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const {auth}=useSelector(state=>state)

  const onChangeSearch = query => setSearchQuery(query);
  return (
   
    <View style={styles.header}>
      <View style={styles.top}>
        <Icon name="bars" onPress={() => navigation.openDrawer()}style={{ fontSize: ICON_SIZE, color: IOCN_COLOR }}></Icon>
        <Text>LoGO</Text>
        <Icon name="user" 
        onPress={()=>{
          auth.isLogin?navigation.navigate({name:NAVIGATION.MYACCOUNT})
          : navigation.navigate({name:NAVIGATION.LOGIN})
         
        }}
        style={{ fontSize: ICON_SIZE, color: IOCN_COLOR, alignItems: "flex-end" }}></Icon>
      </View>

      <SearchInput
      onFocus={()=>{
        navigation.navigate({name:NAVIGATION.SEARCH})
      }}
      hideAction={true}
      hideClear={true}
      ></SearchInput>

    </View>

  );
}
export default Header;
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "auto",
    padding: 20,
    backgroundColor: SECONDARY_BG,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:10
    
  },
  searchBox: {
   
  

    
  
  },
  search:{
    
    flex:1 ,
    paddingStart: 10,
    height:"100%"
    
    
    
  
  }
});