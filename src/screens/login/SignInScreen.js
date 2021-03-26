import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert, ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


import {login,sendOtp,verifyOtp} from '../../redux/actions/auth.action'
import {loginSuccess} from '../../redux/reducers/auth.reducer'

import Users from '../../model/users';
import { useDispatch } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { PRIMARY_COLOUR } from '../../styles/colors';
import { NAVIGATION } from '../../constants/navigation';
import { API } from '../../services/http.base';

const SignInScreen = () => {

    const [data, setData] = React.useState({
        mobile: '',
        isValidUser: false,
        isValidOtp: false,
        otp:''
        
    });
    const [isOtp,setOtp]=useState(false);
    const navigation=useNavigation();

    const { colors } = useTheme();
    const dispatch=useDispatch();
   
    const textInputChange = (val,type) => {
        let len=10;
        if(type=='otp')
        {
            if( val.trim().length == 6 ) {
                setData({
                    ...data,
                    isValidOtp:true,
                    otp:val
                });
            } else {
                setData({
                    ...data,
                    otp:val,
                    isValidOtp:false
                });
            } 
        }else{
            if( val.trim().length == 10 ) {
                setData({
                    ...data,
                    mobile: val,
                    isValidUser: true
                });
            } else {
                setData({
                    ...data,
                    mobile: val,
                    isValidUser: false,
                });
            }
        }

        
    }



    const loginHandle = async(mobile) => {
            try {
                let data=await sendOtp(mobile);
                console.log("data",data)
                if(data.status){
                    setOtp(true);
                }
               
            } catch (error) {
                setOtp(false);
            }
       
       
    }
    const loginWithOTP=async ()=>{
        try {
            
            if(data){
          let result=  await API.login(data.mobile,data.otp);
          console.log('result',result.data)
          let data1=result.data;
          if(data1.status){
              setData(
                {
                    mobile: '',
                    isValidUser: false,
                    isValidOtp: false,
                    otp:''
                    
                }
              )
              setOtp(false)
            dispatch(loginSuccess(data1.user));
            navigation.navigate({name:NAVIGATION.HOME})
          }
          }else{
              ToastAndroid.show("Wrong Otp",ToastAndroid.LONG)
          }
         
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        

      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
            
          <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
           {isOtp?
           
           <View>

            <Text style={[styles.text_footer, {
                            color: colors.text,
                            textAlign:'center'}]}>Enter Otp
            </Text>
            <View style={{flexDirection:'row' ,justifyContent:'center'}}>
            <Text style={[styles.text_footer, {
                            color: '#777',
                            fontSize:12,


                            textAlign:'center'}]}>+91{data.mobile}

            </Text>
            <TouchableOpacity onPress={()=>{
                setData({
                    mobile:'',
                    isValidOtp:false,
                    isValidUser:false,
                    otp:''
                })
                setOtp(false)
            }}>
                <Text style={{color:PRIMARY_COLOUR,paddingLeft:10}}>Change</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Enter OTP"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val,'otp')}
                    keyboardType='numeric'
                />
                
            </View>
            <TouchableOpacity
            disabled={!data.isValidOtp}
                    style={{
                        ...styles.signIn,
                        
                    }
                    }
                    onPress={() => {loginWithOTP( )}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                        opacity:data.isValidOtp?1:.5
                    }]}>Login </Text>
                </LinearGradient>
                </TouchableOpacity>

           </View>
           :
           
           <View>
            <Text style={[styles.text_footer, {
                color: colors.text,
                textAlign:'center'
            }]}>Enter Mobile Number</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Mobile Number (10 digit)"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    keyboardType='numeric'
                />
                
            </View>
            <TouchableOpacity
            disabled={!data.isValidUser}
                    style={{
                        ...styles.signIn,
                        
                    }
                    }
                    onPress={() => {loginHandle( data.mobile )}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff',
                        opacity:data.isValidUser?1:.5
                    }]}>Continue </Text>
                </LinearGradient>
                </TouchableOpacity>
         </View>   
}
        </Animatable.View>


               

      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        //alignContent:'center',
        //justifyContent:'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginLeft:20,
        marginRight:20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
      
       
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding:40,
        paddingTop:10,
        paddingBottom:10,
        marginTop:20
        },
    textSign: {
        fontSize: 16,
        fontWeight: 'normal'
    }
  });
