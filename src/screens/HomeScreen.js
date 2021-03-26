import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert} from 'react-native';

import Header from './header/home.header';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeSlider } from './slider/HomeSlider';
import { HorizontalProductScroll } from './products/horizontal.product.slider';
import { CategoryList } from './category/CatGrid';
import { ProductGrid } from './products/productgid';
import { NAVIGATION } from '../constants/navigation';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {getHomeData} from '../redux/actions/home.action'
import { API } from '../services/http.base';
import { get_cart } from '../redux/actions/cart.action';
const HomeScreen = ({navigation,route}) => {
  const n =useNavigation()
  const {home,auth}=useSelector(state=>state);
  const [banners,setBanners]=useState([]);
  const [categories,setcategory]=useState([]);
  const [products,setproducts]=useState([]);
 
  const dispatch = useDispatch()

  const getBanners=async()=>{
    try {
      let data=await API.get("banner");
      if(data.status){
        setBanners(data.banners);
      }
      console.log("data",data);
    } catch (error) {
      console.log("err",error)
    }
  }
  const getCategory=async()=>{
    try {
      let data=await API.get("category");
      if(data.status){
        setcategory(data.categories);
      }
      console.log("data",data);
    } catch (error) {
      console.log("err",error)
    }
  }
  const getProduct=async()=>{
    try {
      let data=await API.get("product/location");
      if(data.status){
        setproducts(data.products);
      }
      console.log("data",data);
    } catch (error) {
      console.log("err",error)
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

     // Alert.alert('Refreshed');
      getBanners();
    getCategory();
    getProduct()
    if(auth && auth.isLogin){
      dispatch(get_cart())
    }
    });
    return unsubscribe;
  }, [navigation]);
  
  // useEffect(()=>{

  //   console.log("Home screen Load")
    
    
    
  // },[])
  
    return (
      <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <ScrollView>
       
      <HomeSlider banners={banners}></HomeSlider>
      <HorizontalProductScroll products={home.featured}></HorizontalProductScroll>
      <CategoryList categories={categories} navigation={navigation}></CategoryList>
      <ProductGrid products={products}></ProductGrid>
      </ScrollView>
     
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
