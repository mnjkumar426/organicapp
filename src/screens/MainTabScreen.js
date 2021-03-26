import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import { ProductScreen } from './products/prodctScreen';
import { NAVIGATION } from '../constants/navigation';
import { SearchProductScreen } from './products/search.product';

import { IOCN_COLOR, PRIMARY_COLOUR } from '../styles/colors';
import { useSelector } from 'react-redux';
import { MyAccount } from './myprofile/myaccount/Myaccount';
import { Basket } from './basket/Basket';
import {Address}  from './address/Address'
import {AddAddress}  from './address/AddAddress'
import {Payment}  from './basket/Payment'
import {OrderSuccess} from './basket/OrderSuccess'
import { MyOrder } from './myprofile/order/Myorder';


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const BasketStack = createStackNavigator();
const MyAccountStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = 
() =>{
  const {carts}=useSelector(state=>state.cart);
  //console.log("carts",JSON.stringify(carts))

return(
  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={PRIMARY_COLOUR}
      inactiveColor="#777"
      //sceneAnimationEnabled={true}
      shifting={false}
      style={{backgroundColor:'#fff'}}
      labeled={true}
      barStyle={{backgroundColor:"#fff",
      borderTopWidth:1,borderTopColor:"#ddd",
      
    }}
    
    >
      <Tab.Screen
      
        name={NAVIGATION.HOME}
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION.MYACCOUNT}
        component={MyAccountStackScreen}
        options={{
          
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION.BASKET}
        component={BasketStackScreen}
        options={{
          tabBarLabel: 'Basket',
          tabBarColor: '#fff',
          tabBarBadge:carts && carts.length>0?carts.length:false,
          tabBarIcon: ({ color }) => (
              <MIcon name="cart" color={color} size={26} />
              ),
        }}
      />
    </Tab.Navigator>
);
      
}
export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
      
    <HomeStack.Screen name={NAVIGATION.HOME} component={HomeScreen} options={{
        title:'Overview',
        headerShown:false,
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
         <HomeStack.Screen name={NAVIGATION.PRODUCT_SCREEN} component={ProductScreen} options={{
        title:'Product',
        headerShown:false
       
        }} 
        
        
        
        />
         <HomeStack.Screen name={NAVIGATION.PRODUCT_SEARCH_SCREEN} component={SearchProductScreen} options={{
        title:'Product',
        headerShown:false
       
        }} />


        
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
  
const BasketStackScreen = ({navigation}) => (
  <BasketStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <BasketStack.Screen name={NAVIGATION.BASKET} component={Basket} options={{
          headerShown:false
          }} />
          <BasketStack.Screen name={NAVIGATION.ADDRESS} component={Address} options={{
          headerShown:false
        }} />
        <BasketStack.Screen name={NAVIGATION.NEW_ADDRESS} component={AddAddress} options={{
          headerShown:false
        }} />

      <BasketStack.Screen name={NAVIGATION.PAYMENT} component={Payment} options={{
          headerShown:false
        }} />

<BasketStack.Screen name={NAVIGATION.ORDER_SUCCESS} component={OrderSuccess} options={{
          headerShown:false
        }} />
  </BasketStack.Navigator>
  );


  const MyAccountStackScreen = ({navigation}) => (
    <BasketStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <MyAccountStack.Screen name={NAVIGATION.MYACCOUNT} component={MyAccount} options={{
            headerShown:false
            }} />
            <MyAccountStack.Screen name={NAVIGATION.MYORDER} component={MyOrder} options={{
            headerShown:false
          }} />
         
    </BasketStack.Navigator>
    );