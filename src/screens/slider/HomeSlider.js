import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  
} from 'react-native';

import {SLIDERS} from '../../constants/constant'

const {width: screenWidth} = Dimensions.get('window');

export const HomeSlider = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(SLIDERS);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    // console.log(item)
    return (
        <View style={styles.item}>
          <ParallaxImage
            source={item.name}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.1}
            {...parallaxProps}
          />
         
        </View>
      );
    };
  
    return (
      
      <View style={styles.container}>
       
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={entries}
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
      resizeMode: 'cover',
    },
    
     
  });