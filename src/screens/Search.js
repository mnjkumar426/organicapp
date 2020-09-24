import React from 'react';
import { View, Text, Button, StyleSheet, Surface } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIMARY_BG } from '../styles/colors';

const Search = () => {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Searchbar style={styles.Search}></Searchbar>
            </View>
            <ScrollView></ScrollView>
        </View>


    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor:PRIMARY_BG
       
        
    },
    header: {
        padding:10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    Search: {

        borderRadius: 30,


    },
});
