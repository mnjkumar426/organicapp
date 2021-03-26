import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { PRIMARY_COLOUR } from "../styles/colors";

const Loader = () => {
 
  const { loading } = useSelector(state => state)
  
  return (
   
      <Modal
      
        animationType="fade"
        transparent={true}
        visible={loading.loading}
        
        // onRequestClose={() => {
         
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color={PRIMARY_COLOUR}></ActivityIndicator>
            <Text>{"Please wait ..."}</Text>
          </View>
        </View>
      </Modal>

      
  
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
      width:"80%",
    margin: 20,
    backgroundColor: "white",
    minHeight:100,
   
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Loader;
