import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { IOCN_COLOR } from '../../styles/colors';
import { ICON_SIZE } from '../../styles/size';

import { API } from '../../services/http.base';
import { BOX_SHADDOW } from '../../styles/boxshaddow';
import { RadioButton, Title } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AppStyle from '../../styles/style'
import { NAVIGATION } from '../../constants/navigation';
export const AddAddress = () => {
    const { auth } = useSelector(state => state);
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [locations, setLocation] = React.useState([]);
    const [addressModel, setAddressModel] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        houseNo: "",
        apartmentName: "",
        street: "",
        landMark: "",
        area: "",
        pinCode: "",
        nickName: "",
        locationId: "",
        default: false
    });
    const addAddress = async () => {
        try {
            let address = await API.post("user/profile/address",addressModel);
            console.log("Address=====",address)
            if (address && address.status) {
                navigation.navigate(NAVIGATION.ADDRESS)
               
            }
        } catch (error) {

        }
    }

    const getLocations = async () => {
        try {
            let locations = await API.get("location");
            if (locations && locations.status) {
                console.log("Locations", locations.locations)
                setLocation(locations.locations)
                // console.log("Locations",locations.locations)
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        getLocations();
    },
        [])

        const handleSubmit=()=>{
            console.log("address Model",addressModel)
            addAddress()
        }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon name='keyboard-backspace' size={ICON_SIZE} color={IOCN_COLOR} ></Icon>
                </TouchableOpacity>
                <Text style={styles.title}>Add New Address</Text>

            </View>

            <ScrollView style={{ flex: 1 }}>
                <>
                    <View style={{ flexDirection: 'column', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                dense={true}

                                style={{ flex: 1, margin: 10, }}
                                placeholder="First Name"

                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, firstName: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                            <TextInput
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Last Name"
                                dense={true}
                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, lastName: val })

                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View>
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Phone Number"

                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, mobile: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <Title>Address Details</Title>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="House No."

                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, houseNo: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Apartment Name"

                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, apartmentName: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View>
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Street"

                                onChangeText={
                                    (val) => { 
                                        setAddressModel({ ...addressModel, street: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>

                        <View>
                            <TextInput
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Landmark"
                                dense={true}
                                onChangeText={
                                    (val) => {
                                        setAddressModel({ ...addressModel, landMark: val })
                                     }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View>
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Area Details"

                                onChangeText={
                                    (val) => { 
                                        setAddressModel({ ...addressModel, area: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Picker
                                selectedValue={addressModel.locationId}
                                mode="dropdown"
                                style={{ height: 50, flex: 1 }}
                                onValueChange={(itemValue, itemIndex) => {

                                   // setSelectedLocation(itemValue)
                                    setAddressModel({ ...addressModel, locationId: itemValue })
                                }}
                            >
                                <Picker.Item label="Select City" value="0" />
                                {
                                    locations.map((location) => {
                                        return (
                                            <Picker.Item label={location.title} value={location.id} />
                                        )
                                    })

                                }

                            </Picker>
                            <TextInput
                                dense={true}
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Pin code"

                                onChangeText={
                                    (val) => { 
                                        setAddressModel({ ...addressModel, pinCode: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View>
                            <TextInput
                                style={{ flex: 1, margin: 10 }}
                                placeholder="Nick Name"
                                dense={true}
                                onChangeText={
                                    (val) => { 
                                        setAddressModel({ ...addressModel, nickName: val })
                                    }
                                    // textInputChange(val)
                                }

                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Checkbox

                                status={addressModel.default ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    //setChecked(!checked);
                                    setAddressModel({ ...addressModel, default: !addressModel.default })

                                }} />
                            <Text style={{ textAlignVertical: "center" }}>Set Default Address</Text>

                        </View>
                        <View style={{ justifyContent: 'center', flex: 1 }} >
                            <TouchableOpacity style={{ ...AppStyle.button, paddingEnd: 20, paddingStart: 20, }} onPress={() => {
                                // navigation.navigate({ name: NAVIGATION.ADDRESS })
                                handleSubmit()
                            }

                            } >
                                <Text style={{ color: 'white', textAlign: 'center' }}>Add Address</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    );
};

;

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    header: {
        backgroundColor: '#fff',
        flexDirection: 'row',

        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    title: {
        fontSize: 18,
        color: IOCN_COLOR
    },
    box: {
        ...BOX_SHADDOW,
        backgroundColor: "white",
        borderTopLeftRadius: 0,
        borderRadius: 0,


        elevation: 3,
        padding: 10,
        maxHeight: "100%",
        marginBottom: 2

    },

});
