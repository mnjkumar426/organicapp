import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const BookmarkScreen = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  
  
    return (
      <Appbar.Header style={{backgroundColor:"white"}}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={<Text style={style} > {title} </Text>} style={{ alignItems: 'center' }}
      />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
     
    </Appbar.Header>
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
