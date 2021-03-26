import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TabView, SceneMap,TabViewAnimated, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { IOCN_COLOR, PRIMARY_COLOUR, SECONDARY_COLOUR } from '../../styles/colors';
import { NotFound } from '../NotFound';
import { ProductGrid } from './productgid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ICON_SIZE } from '../../styles/size';
import { TouchableHighlight } from 'react-native';
import { NAVIGATION } from '../../constants/navigation';
import { getSubCatData } from '../../redux/actions/cat.action';
import { fetchCatSuccess } from '../../redux/reducers/subcat.reducer';
import { API } from '../../services/http.base';
const Entities = require('html-entities').AllHtmlEntities;


const entitie=new Entities();

 
export  function ProductScreen() {
    const route =useRoute();
    const navigation=useNavigation()
    const [subCats,setSubCats]=React.useState([]);
    const [products,setProducts]=React.useState([]);
    const {params}=route;  
  const [index, setIndex] = React.useState(0);
  const [routes,setRoutes] = React.useState([{key:"all",title:'all'}]);
  const dispatch=useDispatch();

  const getSubCatData=async ()=>{
    try {
      
      let data=await API.get("product/subCat/"+params.id)
      console.log("data",data)
      if(data.status){
        setSubCats(data.categories);
        setProducts(data.products)
      }
    } catch (error) {
      
    }
      
  }

  React.useEffect(()=>{
    getSubCatData()
  // dispatch(fetchCatSuccess({
  //   categories:[],
  //   products:[]
  // }))
  //dispatch(getSubCatData(params.id));


  },[route])
  React.useEffect(()=>{
   
   
    if(subCats  && subCats.length>0)
    {
      let routes=subCats.map(cat=>{
          return {key:cat.id,title:entitie.decode(cat.title),products:cat.products}
      })
      setRoutes(routes)
    }
  

  },
  [subCats]
  )
 


 const  _renderScene = ({ route }) => {
    return (
      
      <ScrollView >
        <ProductGrid products={route.products}></ProductGrid>

    </ScrollView>
    );
  };
  const  _renderParentProducts = () => {
    return (
        <ScrollView  >
        <ProductGrid products={products}></ProductGrid>

    </ScrollView>
    );
  };

  const _handleChangeTab = (index) => {
    setIndex({ index });
  };
 
  return (
    <View  style={styles.container}>
      <View style={styles.header}>
       <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
      </TouchableOpacity> 
        <Text style={styles.title}>{entitie.decode(params.title)}</Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate({name:NAVIGATION.SEARCH})
        }}>
        <Icon name='magnify' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
        </TouchableOpacity>
      </View>
      

{ subCats&& subCats.length>0?
    <TabView
         
          navigationState={{index,routes}}
          renderScene={_renderScene}
          onRequestChangeTab={_handleChangeTab}
          onIndexChange={setIndex}
          lazy
          
          
          
          renderTabBar={props => (
            <TabBar
              {...props}
              bounces
              indicatorStyle={styles.indicator}
              tabStyle={{ width: 'auto', padding: 0, paddingHorizontal: 2, paddingVertical: 4 }}
              scrollEnabled={true}
              style={styles.tabbar}
              labelStyle={styles.label}
              renderLabel={({ route, focused, color }) => (
                <Text style={{ color:focused?'black':"#777",paddingLeft:10,paddingRight:10 }}>
                  {route.title} 
                </Text>
              )}
              
            />
          )}
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
          
        />
        :(products && products.length>0)?_renderParentProducts():
        <NotFound></NotFound>
        }
      
        </View>
  );
}
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    tabbar: {
      backgroundColor: '#fff',
      
    },

   
    indicator: {
      backgroundColor: PRIMARY_COLOUR,height:3
    },
    label: {
      color: '#333',
      //fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize:14

     
    },
    header:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
          paddingLeft:15,
          paddingTop:15,
          paddingRight:15,
          paddingBottom:15
    },
    title:{
    fontSize:18,
    color:IOCN_COLOR
    }
  });