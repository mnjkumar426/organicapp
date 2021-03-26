import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  
} from 'react-native';

import {IMAGE_BASE_URL, SLIDERS} from '../../constants/constant'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../../constants/navigation';

const {width: screenWidth} = Dimensions.get('window');

export const HomeSlider = ({banners}) => {
  const carouselRef = useRef(null);
  //const {banners}=useSelector(state=>state.home)
  const navigation=useNavigation();
 

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    //setEntries(SLIDERS);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    
    let imageUrl=item?.image?.path;
    //console.log(JSON.stringify(imageUrl))
     
    return (
        <TouchableOpacity style={styles.item} onPress={()=>{
          navigation.navigate({name:NAVIGATION.PRODUCT_SCREEN,params:item});
        }}>
          
          <ParallaxImage
            source={{uri:imageUrl}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.1}
            {...parallaxProps}
            
          />
         
        </TouchableOpacity>
      );
    };
  
    return (
      
      <View style={styles.container}>
       
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={banners}
          renderItem={renderItem}
          hasParallaxImages={true}
          horizontal={true}
          loop={true}
          enableSnap={true}
          activeSlideOffset={10}
      
        />
        
      </View>
     
    );
  };
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      width: screenWidth - 60,
      height: 150,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 4,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'stretch',
    },
    
     
  });