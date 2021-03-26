import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/Entypo';
import {logout} from '../redux/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION } from '../constants/navigation';
import { IOCN_COLOR, LIGHT_COLOUR, PRIMARY_COLOUR, SECONDARY_BG } from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Appstyle from '../styles/style'

export function DrawerContent(props) {

    const paperTheme = useTheme();
    const dispatch = useDispatch()
    const {defaultLocation,isLogin,user}=useSelector(state=>state.auth)
    

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{user?.name}</Title>
                                
                            </View>
                            {isLogin?null:
                            <TouchableOpacity onPress={()=>{
                                props.navigation.navigate(NAVIGATION.LOGIN)
                            }}  >
                                <Text style={
                                   { ...Appstyle.button,
                                    marginLeft:10,
                                    marginTop:10
                                   }
                                   
                                }>Login Now</Text>
                            </TouchableOpacity>
}
                        </View>

                        <TouchableOpacity style={styles.row} 
                         onPress={() => {props.navigation.navigate(NAVIGATION.LOCATION)}}
                        >
                        <MIcon name='location-pin'  size={25} color={IOCN_COLOR} />
                            <Text style={{fontSize:18,padding:10}}>{defaultLocation?.title}</Text>
                        <MIcon name="chevron-down" size={25} style={{paddingTop:10}} color={IOCN_COLOR}></MIcon>
                        </TouchableOpacity>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Products"
                            onPress={() => {props.navigation.navigate(NAVIGATION.PRODUCT_SCREEN)}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {dispatch(logout())}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      borderBottomWidth:1,
      borderBottomColor:"#ddd",
      paddingBottom:20,
      backgroundColor:LIGHT_COLOUR
      
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
