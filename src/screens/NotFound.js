import React from "react";

import {
  
  StyleSheet,
  Text,

  View
} from "react-native";


 export const NotFound = () => {
 
 
  
  return (
   
     
  
        <View style={styles.container}>
          <Text>No Item found</Text>
        </View>
  

      
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
  
});


