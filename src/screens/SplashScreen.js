import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION } from '../constants/navigation';
import { AsyncStorage } from 'react-native';
import { INITIALSTATE } from '../constants/constant';
import { Initialstate } from '../constants/initialstate';
import { setinitialState } from '../redux/reducers/auth.reducer';
import { get_cart } from '../redux/actions/cart.action';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const dispatch=useDispatch();
   
    useEffect(()=>
    {

        const intiApp= async()=>{
            let initState=await AsyncStorage.getItem(INITIALSTATE);
            if(!initState){
              await AsyncStorage.setItem(INITIALSTATE,JSON.stringify(Initialstate));
            }
            let init=await AsyncStorage.getItem(INITIALSTATE)
            init=JSON.parse(init);
            console.log("init",init)
            let defaultLocation=(init && init.user && init.user.locationId)?
            init.user.locationId:init.defaultLocation;
            init.defaultLocation=defaultLocation;
            dispatch(setinitialState(init));
            if(init && init.user && init.user.token){
               // dispatch(get_cart());
            }
          

            setTimeout(() => {
                if(init.defaultLocation){
                    navigation.navigate({name:NAVIGATION.HomeDrawer})
                 }else{
                     navigation.navigate({name:NAVIGATION.LOCATION})
                 }
            }, 2000);

        
          }
           
     intiApp()
       
       
        
    }
    ,[])
   

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
            animation="bounceIn"
            duraton="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
             <ActivityIndicator size='large' color="#fff"></ActivityIndicator>
        </View>
       
       
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

