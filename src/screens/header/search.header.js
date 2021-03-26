import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  LIGHT_COLOUR, IOCN_COLOR } from '../../styles/colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ICON_SIZE } from '../../styles/size';
import { BOX_SHADDOW } from '../../styles/boxshaddow';



export const   SearchHeader=(props)=> {
    console.log(props)

  return (
   
    <View style={adjustedStyle.headerContainer}>
    <SearchInput {...props}></SearchInput>
            </View>

  );
}
export const SearchInput=(props)=>{
return(
<View style={adjustedStyle.header}>
        { !props.hideAction?<TouchableOpacity 
        style={{width:40}}
        onPress={props.onAction?props.onAction:()=>{}}>
         <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>


        </TouchableOpacity>
        :<View></View>
}
                <TextInput
                    returnKeyType='search'
                    underlineColorAndroid='transparent'
                    placeholder={props.placeholder?props.placeholder:"Search"}
                    onFocus={props.onFocus?props.onFocus:()=>{}}
                    onPress={props.onPress}
                    value={props.value?props.value:""}
                    style={adjustedStyle.input}


                    onChangeText={props.onChangeText?props.onChangeText:()=>{}}
                />
                {
                   !props.hideClear? <View style={adjustedStyle.action}>
                        <TouchableOpacity onPress={props.onClose?props.onClose:()=>{}}>
                            <Icon name='close' size={ICON_SIZE} ></Icon>



                        </TouchableOpacity>
                    </View>
                    :<View/>
                }
            </View>
)
}


const adjustedStyle= StyleSheet.create({
    headerContainer:{
        ...BOX_SHADDOW,
        backgroundColor: "#fff",
        padding:20

    },
    header: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: LIGHT_COLOUR,
       
        height:40,
        borderRadius:30,
        paddingLeft:10,
        paddingRight:10
    },
    action: {
       
    },
   
    input: {
        flex: 1,
       
        fontWeight: `400`,
        textAlign: `left`,
        backgroundColor: 'transparent',

        marginLeft:5,
        marginRight:5,
        

    },
})







        
