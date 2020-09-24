import React, { useEffect } from 'react';
import { View, StyleSheet, Button} from 'react-native';

import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeSlider } from './slider/HomeSlider';
import { HorizontalProductScroll } from './products/horizontal.product.slider';
import { PRODUCTS, CATS } from '../constants/constant';
import { CategoryList } from './category/CatGrid';
import { ProductGrid } from './products/productgid';
import { NAVIGATION } from '../constants/navigation';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {getHomeData} from '../redux/actions/home.action'
const HomeScreen = ({navigation,route}) => {
  const n =useNavigation()
  //const {home}=useSelector(state=>{state});
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getHomeData());
  },[])
  
    return (
      <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <ScrollView>
       
      <HomeSlider></HomeSlider>
      <HorizontalProductScroll products={PRODUCTS}></HorizontalProductScroll>
      <CategoryList categories={CATS} navigation={navigation}></CategoryList>
      <ProductGrid></ProductGrid>
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
