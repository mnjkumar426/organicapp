import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Surface } from 'react-native';
import { IOCN_COLOR, LIGHT_COLOUR, PRIMARY_BG } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeData } from '../../redux/actions/home.action';
import { NAVIGATION } from '../../constants/navigation';
import { SearchInput } from '../header/search.header';
import { BOX_SHADDOW } from '../../styles/boxshaddow';
import { ICON_SIZE } from '../../styles/size';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import {setDefaultLocation} from '../../redux/reducers/auth.reducer'
import {getLocation} from '../../redux/actions/home.action'
import { API } from '../../services/http.base';

const Location = ({navigation}) => {
    //const navigation = useNavigation()
    //const {location}=useSelector(state=>state.home);
    const dispatch=useDispatch();
    const [list,setList]=useState([]);
    const [location,setLocations]=useState([]);

    const getLocation=async()=>{
        try {
            let data=await API.get('location');
            console.log("data",data.locations)
            if(data.status){
                      let  fliterlist=data?.locations?.map(item=>{
           return{
               ...item,
               key:item.id
           }
       })
       
       console.log("fliterlist",fliterlist)
       setList(fliterlist);
               // setLocations(data.locations)
            }

        } catch (error) {
            
        }
    }
    useEffect(()=>{
     getLocation()
    },[])
//    useEffect(()=>{
//       let  fliterlist=location.map(item=>{
//            return{
//                ...item,
//                key:item.id
//            }
//        })
//        console.log(fliterlist)
//        setList(fliterlist);
//    },[location]) 
  const  getListViewItem = (item) => { 
      console.log("item",item)
            dispatch(setDefaultLocation(item))
            navigation.navigate({name:NAVIGATION.HomeDrawer})

        //TODO

    }  
    const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#ddd",  
                }}  
            />  
        );  
    };  
    return (

        <View style={styles.container}>
            <View style={styles.header}>
        <View style={styles.headerTop}>
        <TouchableOpacity 
        style={{width:40}}
        onPress={()=>{
            navigation.goBack()
        }}>
         <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>


        </TouchableOpacity>  
        <Text style={styles.title}>Select Location</Text>
        </View> 
            <SearchInput
             hideAction={true}
            ></SearchInput>
            </View>
            <FlatList  
                    data={list} 
                    style={styles.listContainer} 
                    renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={()=>{getListViewItem(item)}}>{item.title}</Text>}  
                    ItemSeparatorComponent={renderSeparator}  
                />  
        </View>


    );
};

export default Location;

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: LIGHT_COLOUR


    },
    header: {
        ...BOX_SHADDOW,
        padding: 10,
        backgroundColor: 'white',
       
    },
    headerTop:{
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        paddingBottom:20,
        paddingTop:10
       
    },
    title:{
        fontFamily:'Roboto',
        fontSize:18
    },
    Search: {

        borderRadius: 30,
        backgroundColor:LIGHT_COLOUR,
        height:40


    },
    item: {  
        padding: 15,  
        fontSize: 18,
        color:IOCN_COLOR  
       
    }, 
    listContainer:{
        borderRadius:5,
        margin: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3 
    } 
});
