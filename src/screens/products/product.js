import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEVICE_WIDTH } from '../../styles/size';
import { BLACK, SECONDARY_COLOUR, PRIMARY_COLOUR } from '../../styles/colors';
export function Product(props) {
    return (
        
            <View style={[{...props.style}]}>
                <View style={styles.box}>
                <View style={styles.imageContainer}>
                    <Image source={props.data.url} style={styles.image} />
                </View>
                <Text style={styles.subtitle}>{props.data.cat}</Text>
                <Text style={styles.title}>{props.data.name}</Text>


                <Text style={styles.title}>
                    <Icon style={styles.title} name="rupee"> {props.data.price}</Icon>
                </Text>
                <Button title="Subscribe " color={PRIMARY_COLOUR} ></Button>
                </View>
            </View>

    


    );
}

const styles = StyleSheet.create({
    box: {
       
        backgroundColor: "white",
       
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        padding: 10
    },
    imageContainer: {
        height: 100,
        justifyContent: "center",

        alignItems: 'center'
    },

    image: {

        width: "100%",
        height: "100%"


    },
    title: {
        color: BLACK,
        fontSize: 14,

        paddingBottom: 5

    },
    subtitle: {
        color: SECONDARY_COLOUR,
        fontSize: 14,
        paddingBottom: 5
    },
});