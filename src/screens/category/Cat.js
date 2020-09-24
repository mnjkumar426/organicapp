import React from 'react';
import { View, Text, StyleSheet,Button,Image } from 'react-native';
import { DEVICE_WIDTH, LEFT_MARGIN } from '../../styles/size';
import {SECONDARY_COLOUR} from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NAVIGATION } from '../../constants/navigation';
export  function Category(props) {
 
  return (
   
    <TouchableOpacity style={[styles.box,{...props.style}]}  onPress={()=>{props.navigation.navigate({name:NAVIGATION.PRODUCT_SCREEN,params:props.data})}}>
                <View style={styles.imageContainer}>
                  <Image source={props.data.url} style={styles.image}/>
                </View>
  {/* <Text style={styles.subtitle}>{props.data.name}</Text> */}
                
                
    </TouchableOpacity>
  
         

  );
}

const styles = StyleSheet.create({
    box: {
        width: (DEVICE_WIDTH / 3)-LEFT_MARGIN ,
        height: (DEVICE_WIDTH / 3)-LEFT_MARGIN ,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 5,
       shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
       
        
      },
      imageContainer:{
        
        justifyContent: "center",
        
        alignItems: 'center'
      },
     
        image: {
          backgroundColor:"black",
          width: "100%",
          height: "100%"
      

      },
    
      subtitle: {
        color: SECONDARY_COLOUR,
        fontSize: 16,
      
        paddingBottom:10,
        textAlign: "center"
        
        
      },
});