import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEVICE_WIDTH, ICON_SIZE } from '../../styles/size';
import { BLACK, SECONDARY_COLOUR, PRIMARY_COLOUR, ICON_COLOR, IOCN_COLOR } from '../../styles/colors';
import { IMAGE_BASE_URL } from '../../constants/constant';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addQtyTOCart, removeQtyTOCart } from '../../redux/reducers/cart.reducer'
import { color } from 'react-native-reanimated';
import { Touchable } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { BOX_SHADDOW } from '../../styles/boxshaddow';
import { add_to_cart, remove_to_cart } from '../../redux/actions/cart.action';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../../constants/navigation';
export function Product(props) {
    console.log("props",props.data)
    let imageUrl =  props?.data?.image?.path;
    let locationData= props?.data.locationData;
    const navigation=useNavigation()
    const { carts } = useSelector(state => state.cart)
    const { auth } = useSelector(state => state)
    //console.log("carts",carts)
   

    const dispatch = useDispatch();
    const [qty, setQty] = useState(0);
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const getQty = () => {
            let cart = getCurrentCart();
            if (cart) {
                setQty((cart && cart.qty) ? cart.qty : 0);
            } else {
                setQty(0);
            }
        }
        getQty();
    }, [carts])

    const getCurrentCart = () => {
        let cart = undefined;

        if (carts &&  carts.length > 0) {
            cart = carts.filter(item => {
                //console.log(pro)
                if(props.data.productType=="simple"){
                return (props.data.id == item.productId);
                }else{
                   return  (props.data.id == item.productId && (props?.data?.locationData?.termId==item.termId)); 
                }
            })
            if (cart && cart.length) {
                return cart[0];
            }
        }
        return cart;
    }
    const addTocarts = async (termId) => {
        if(auth.isLogin){
        setLoading(true);
        let d = await dispatch(add_to_cart({
            id: props.data.id,
            qty: 1,
            termId:termId
        }))
        setLoading(false);
    }else{
        navigation.navigate(NAVIGATION.LOGIN);
    }
    }
   
    const removeQty = async (termId) => {
       
        if(auth.isLogin){
            setLoading(true);
            let d = await dispatch(remove_to_cart({
                id: props.data.id,
                qty: 1,
                termId:termId
            }))
            setLoading(false);
        }else{
            navigation.navigate(NAVIGATION.LOGIN);
        }

    }
    const SalePriceBox = () => {
        return (

            <View style={styles.offBox}>
                <Text style={{ color: 'white' }}>
                    {locationData?.salePrice ? (((locationData?.regularPrice-locationData?.salePrice) / locationData.regularPrice) * 100).toFixed(2) + "% off" : 0}
                </Text>
            </View>

        )
    }

    return (

        <View style={[{ ...props.style }]}>

            <View style={{ ...styles.box, flexDirection: props.layout && props.layout == 'full' ? 'row' : 'column' }}>
                {locationData?.salePrice ? <SalePriceBox /> : null}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
                {/* <Text style={styles.subtitle}>{props.data.cat}</Text> */}
                <View style={{ flex: 2 }}>
                    <Text style={styles.title}>{props.data.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {<Text style={{ textDecorationLine: locationData?.salePrice ? 'line-through' : 'none', paddingRight: 10 }}>
                            <Icon name="rupee"> {locationData?.regularPrice}</Icon>
                        </Text>

                        }
                        {locationData?.salePrice ? <Text style={styles.title}>
                            <Icon style={styles.title} name="rupee"> {locationData?.salePrice}</Icon>
                        </Text> : null
                        }

                    {props?.data?.productType=='variable' ? <Text style={styles.title}>
                           {locationData?.termName}
                        </Text> : null
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            qty == 0 ? <TouchableHighlight
                                style={{
                                    backgroundColor: PRIMARY_COLOUR,

                                    padding: 6,
                                    borderRadius: 5,
                                    width: 75

                                }} onPress={() => {
                                    addTocarts(locationData?.termId);
                                }}>
                                <View>
                                    {loading ? <ActivityIndicator size="small" color={'white'} /> :

                                        <Text style={{ color: '#fff', fontWeight: "bold", textAlign: 'center' }}>Add</Text>
                                    }
                                </View>
                            </TouchableHighlight> :
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <TouchableOpacity onPress={() => { removeQty(locationData?.termId) }} style={styles.cartButton}>
                                        <MaterialIcons name="minus" size={ICON_SIZE} color={ICON_COLOR} />
                                    </TouchableOpacity>
                                    <View style={styles.qty}>
                                        {loading ? <ActivityIndicator size="small" color={'white'} />
                                            : <Text
                                                style={styles.qtyTxt}>{qty}
                                            </Text>}
                                    </View>
                                    <TouchableOpacity onPress={() => { addTocarts(locationData?.termId) }} style={styles.cartButton}>
                                        <MaterialIcons name="plus" size={ICON_SIZE} color={IOCN_COLOR} />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>

                </View>

            </View>
        </View>




    );
}

const styles = StyleSheet.create({
    offBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: PRIMARY_COLOUR,
        borderTopLeftRadius: 10,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,

    },

    box: {
        ...BOX_SHADDOW,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderRadius: 5,


        elevation: 3,
        padding: 10,
        maxHeight: "100%",

    },
    imageContainer: {
        height: 100,
        justifyContent: "center",

        alignItems: 'center',
        flex: 1
    },

    image: {

        width: "100%",
        height: "100%",
        resizeMode: 'contain'


    },
    title: {
        color: BLACK,
        fontSize: 14,
        paddingRight: 10,
        paddingBottom: 5

    },
    subtitle: {
        color: SECONDARY_COLOUR,
        fontSize: 14,
        paddingBottom: 5
    },
    cartButton: {
        borderWidth: 1,
        borderColor: PRIMARY_COLOUR,
        padding: 5

    },
    qtyTxt: {
        fontSize: 18,
        fontFamily: "Robot",
        color: '#fff',

        fontWeight: 'bold'
    },
    qty: {

        backgroundColor: PRIMARY_COLOUR,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: PRIMARY_COLOUR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingLeft:10,
        paddingRight:10
        


    },
    salePrice: {
        textDecorationLine: 'line-through',
        color: "#333",

        paddingRight: 10
    }
});