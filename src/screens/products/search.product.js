import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NAVIGATION } from '../../constants/navigation';
import { API } from '../../services/http.base';

import { PRIMARY_COLOUR, SECONDARY_COLOUR } from '../../styles/colors';
import { SearchHeader } from '../header/search.header';
import { NotFound } from '../NotFound';
import { ProductGrid } from './productgid';
const Entities = require('html-entities').AllHtmlEntities;

const entitie=new Entities();

 
export  function SearchProductScreen() {
    const route =useRoute();
    const navigation=useNavigation()
    const [products,setProducts]=React.useState([]);
    const {params}=route;

  
  React.useEffect(()=>{
    const  fetchData=async()=>{
        let data=await API.get('/api/products?tag='+params.name)
          setProducts(data.products)
      }
      
      fetchData();
  },
  [params]
  )
 

  const  _renderParentProducts = () => {
    return (
       
        <ScrollView  >
            
        <ProductGrid products={products}></ProductGrid>
    </ScrollView>
    
    );
  };

 const onPress=()=>{
 }
  return (
    <View  style={styles.container}>
        <SearchHeader
        value={params.name}
        onAction={()=>{
            navigation.navigate({name:NAVIGATION.HOME})
         }}
            onFocus={()=>{
               navigation.navigate({name:NAVIGATION.SEARCH,params:{name:params.name}})
            }}
            onClose={()=>{
                navigation.navigate({name:NAVIGATION.SEARCH,params:{name:""}})
             }}
        ></SearchHeader>

<ScrollView>
            <ProductGrid products={products}></ProductGrid> 
</ScrollView>
      
        </View>
  );
}
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    
  });