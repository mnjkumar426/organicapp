import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DEVICE_WIDTH, LEFT_MARGIN } from '../../styles/size';
import { Category } from './Cat';
export function CategoryList(props) {
    return (
        <View style={{ 
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex:1,
            paddingLeft:10
            }}>
            {props.categories.map((item, i) => {
                return (<Category key={i} data={item} style={{}} navigation={props.navigation} >

                </Category>)
            })}
        </View>


    );
}

const styles = StyleSheet.create({
});