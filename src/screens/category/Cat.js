import React from 'react';
import { View, Text, StyleSheet,Button,Image } from 'react-native';
import { DEVICE_WIDTH, LEFT_MARGIN } from '../../styles/size';
import {SECONDARY_COLOUR,PRIMARY_COLOUR} from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NAVIGATION } from '../../constants/navigation';
import { IMAGE_BASE_URL } from '../../constants/constant';
import { useDispatch } from 'react-redux';
import { getSubCatData } from '../../redux/actions/cat.action';
import { Card, Paragraph, Title } from 'react-native-paper';
export  function Category(props) {
  const dispatch=useDispatch();
 let imageUrl=(props&&props.data &&props.data.image)?props.data.image.path:""
 //let imageUrl=IMAGE_BASE_URL+imagename;
 
 const clickCat=async ()=>{

 
  props.navigation.navigate({name:NAVIGATION.PRODUCT_SCREEN,params:props.data});
 }

 return (
   
  


                <View style={styles.imageContainer}  >
                  
                  <View  style={{ display: 'flex',
                        flex:1,
                        flexFlow: 'column'}}>
                   <TouchableOpacity onPress={()=>{clickCat()}}>      
                  <Image source={{
                     uri:imageUrl ,
                 }}style={styles.image}/>
                 </TouchableOpacity> 
                
                    <View style={styles.subtitle}>
                      <Text style={{color:'white',fontWeight:'bold' , fontSize:14,textAlign:"center"}}>
                      {props?.data?.title?.toUpperCase()}
                      </Text>

                    </View>
                  
                
                 </View>
                </View>
 
                
                
    
  
         

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
        
       // justifyContent: "center",
        
        //alignItems: 'center',
        borderWidth:4,
        borderRadius:5,
        borderColor:PRIMARY_COLOUR,
        width: (DEVICE_WIDTH / 3)-25,
        //minHeight:100,
        margin:10,
       // backgroundColor:PRIMARY_COLOUR
      

       
        
        
        
      },
     
        image: {
          
          backgroundColor:"white",
          width:"100%",
          maxWidth: "100%",
          height: (DEVICE_WIDTH / 3)-25,
          //minHeight:(DEVICE_WIDTH / 3)-25,
          //resizeMode: 'contain'

      

      },
    
      subtitle: {
        backgroundColor:PRIMARY_COLOUR,
         
          padding:5,
         
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          textAlign:'center',
          shadowColor: PRIMARY_COLOUR,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: .5,
          shadowRadius: 10,
          
          elevation: 5,
         
  }
        
        
      
});