/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';

import {
  NavigationContainer, useNavigation
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import RootStackScreen from './screens/RootStackScreen';
import { NAVIGATION } from './constants/navigation';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store'
import Loader from './screens/Loader';
import LocationScreen  from './screens/location/Location';
import { SearchScreen } from './screens/search/SearchScreen';
import { AutoSuggeionSearch } from './components/Search';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/login/SignInScreen';
import { View } from 'react-native-animatable';
import { AsyncStorage } from 'react-native';
import { INITIALSTATE } from './constants/constant';
import { Initialstate } from './constants/initialstate';
import { setinitialState } from './redux/reducers/auth.reducer';
const Drawer = createDrawerNavigator();
const App = () => {
  const { auth } = useSelector(state => state)
  const [isSplash,setSplash]=useState(true);
 useEffect(()=>{
setTimeout(() => {
  setSplash(false)
}, 2000);
 },[])
 
  return (
<View style={{flex:1}}>
  
    <NavigationContainer >
     
      

      <Loader></Loader>
     
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          
          {<Drawer.Screen name="SplashScreen" component={SplashScreen}/> }
          <Drawer.Screen name={NAVIGATION.LOCATION} component={LocationScreen}  />
          <Drawer.Screen name={NAVIGATION.HomeDrawer} component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name={NAVIGATION.SEARCH} component={AutoSuggeionSearch} />
          
          {/* <Drawer.Screen name="SplashScreen" component={SplashScreen}/> */}
        <Drawer.Screen name={NAVIGATION.LOGIN} component={SignInScreen}/>
        {/* <Drawer.Screen name="SignUpScreen" component={SignUpScreen}/> */}
        </Drawer.Navigator>


   

    
      

    </NavigationContainer>

    </View>


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
