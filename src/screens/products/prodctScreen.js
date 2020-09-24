import React from 'react';
import { StyleSheet, ScrollView, Text ,View} from 'react-native';
import { ProductGrid } from './productgid';
import { Appbar } from 'react-native-paper';
import {useRoute, useNavigation} from '@react-navigation/native';
export function ProdcutScreen() {
    const route =useRoute();
    const navigation=useNavigation()
    const {params}=route;
   
    return (
        <View>
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction onPress={()=>{navigation.goBack()}} />
    <Appbar.Content title={<Text style={{textAlign:"center"}} > {params?params.name:""}</Text>} style={{ alignItems: 'center' }}
                />
                <Appbar.Action icon="magnify" onPress={()=>{}}  />

            </Appbar.Header>
            <ScrollView >
                <ProductGrid></ProductGrid>

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
});