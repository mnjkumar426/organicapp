import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOUR, SECONDARY_BG, PRIMARY_BG } from '../styles/colors';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { ICON_SIZE } from '../styles/size';
import { Searchbar } from 'react-native-paper';
import { NAVIGATION } from '../constants/navigation';
import { useNavigation } from '@react-navigation/native';
const   Header=()=> {
  const navigation=useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
   
    <View style={styles.header}>
      <View style={styles.top}>
        <Icon name="bars" onPress={() => navigation.openDrawer()}style={{ fontSize: ICON_SIZE, color: SECONDARY_COLOUR }}></Icon>
        <Text>LoGO</Text>
        <Icon name="user" style={{ fontSize: ICON_SIZE, color: SECONDARY_COLOUR, alignItems: "flex-end" }}></Icon>
      </View>

      <View style={styles.searchBox}>
        {/* <Icon name="search" style={{ fontSize: ICON_SIZE, color: SECONDARY_COLOUR }}></Icon>
        <TextInput placeholder="Search for Produts" style={styles.search}></TextInput> */}
      <Searchbar
        placeholder="Search"
      onChangeText={onChangeSearch}
      onFocus={()=>{navigation.navigate(NAVIGATION.SEARCH)}}
      style={{backgroundColor:SECONDARY_COLOUR,borderRadius:30}}
      value={searchQuery}
    />
      </View>

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