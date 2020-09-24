/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';

import {
  NavigationContainer
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './screens/Search';
import { NAVIGATION } from './constants/navigation';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store'
const Drawer = createDrawerNavigator();
const App = () => {
  const { auth } = useSelector(state => state)
  console.log("auth",auth)

 
 
  return (

    <NavigationContainer >
      {auth.isLogin ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          {/* <Drawer.Screen name={NAVIGATION.PRODUCT_SCREEN} component={ProductStactScreen} /> */}
          <Drawer.Screen name={NAVIGATION.SEARCH} component={Search} />
        </Drawer.Navigator>


      )
        :
        <RootStackScreen />
      }

    </NavigationContainer>


  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
