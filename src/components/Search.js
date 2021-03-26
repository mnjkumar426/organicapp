
'use strict';

import React, { useEffect, useState } from 'react';
import ReactNative, { Dimensions } from 'react-native';
import { View as AnimatedView, View } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { ICON_SIZE } from '../styles/size';
import { IOCN_COLOR, LIGHT_COLOUR, PRIMARY_COLOUR } from '../styles/colors';
import { API } from '../services/http.base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BOX_SHADDOW } from '../styles/boxshaddow';
import { NAVIGATION } from '../constants/navigation';
import { SearchHeader } from '../screens/header/search.header';
import { PixelRatio } from 'react-native';
import { FlatList,Text } from 'react-native';
const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowColor: `#576970`
};

const historyEntryRollOverCount = 10;
const AutoSuggeionSearch = () => {
    let enableSuggestion = true;
    const [searchText, setSearchText] = useState('');
    const [suggestion, setSuggestion] = useState({ autocompletes: [], histories: [] })
    const navigation=useNavigation();
    const route =useRoute();

    useEffect(()=>{
        //console.log(route)
      setSearchText((route.params && route.params.name)?route.params.name:"")  
    },[route])
    const onGetAutocompletions = async (text) => {
        try {
            let data = await API.get(`/wc/v3/products/tags?search=${text}`,false)
            return data
        } catch (error) {

            return []
        }
    }


    const onEditting = async (value) => {
        setSearchText(value)
      

        if (enableSuggestion) {

            const autocompleteTexts = await onGetAutocompletions(searchText);
            if (Array.isArray(autocompleteTexts) && autocompleteTexts.length) {
                setSuggestion({
                    ...suggestion,
                    autocompletes: autocompleteTexts.map((item) => {
                        return {
                            suggestionType: `autocompletion`,
                            item: item
                        };
                    })
                })
            };

        }
    }
    const renderInput = () => {


       
        return (
            <SearchHeader
            value={searchText}
            onChangeText={onEditting}
            onAction={() => {
                console.log("call on press Action")
                navigation.navigate({name:NAVIGATION.HOME})
                }}
            onClose={() => {
                setSearchText('');
                setSuggestion({
                    ...suggestion,
                    autocompletes: []
                })
            }}    
            ></SearchHeader>

        );

    }
    const renderSuggestions = () => {
       
        if (enableSuggestion) {
            
            const suggestionEntries = suggestion.histories.sort((itemA, itemB) => {
                return itemB.timestamp - itemA.timestamp;
            }).concat().concat(suggestion.autocompletes);
           

            return (
                <AnimatedView

                    duration={300}
                    pointerEvents='box-none'
                    useNativeDriver={false}

                // style = { adjustedStyle.suggestion }
                >
                    <FlatList

                        scrollEnabled={true}
                        data={suggestionEntries}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => {
                            return (<View
                                style={{
                                    height: 1,
                                    width: "100%",
                                    backgroundColor: "#ddd",
                                }}
                            />
                            );
                        }
                        }
                        style={{


                        }}
                    />
                </AnimatedView>
            );
        }
        return null;
    }

    const renderItem = ({ item }) => {
       
        let entry = item.item
        
        return (
            <TouchableNativeFeedback
                key={item.term_id}
                onPress={() => {
                 
                    let histories = suggestion.histories;
                    // console.log("Historei",suggestion.histories);

                    // if (!suggestion.histories.some((_entry) => _entry.name === entry.name)) {

                    //     if (histories.length >= historyEntryRollOverCount) {
                    //         histories.pop();
                    //     }
                    //     histories.push({
                    //         suggestionType: `history`,
                    //         item: entry,
                    //         timestamp: new Date().getTime()
                    //     });
                    // }
                    // console.log("suggestion.histories",suggestion.histories)

                    setSearchText(entry.name);
                    setSuggestion({
                        ...suggestion,
                        visible: false,
                        autocompletes: [],
                        histories
                    })
                    navigation.navigate({name:NAVIGATION.PRODUCT_SEARCH_SCREEN,params:entry})



                }}>
                <View style={{
                    flexDirection: `row`,

                    backgroundColor: `transparent`,
                    padding: 20

                }}>
                    {

                        (item.suggestionType === `history`) ?
                            <Icon name="history" size={ICON_SIZE} color={IOCN_COLOR}></Icon>
                            : <Icon name='magnify' size={ICON_SIZE} color={IOCN_COLOR}></Icon>

                    }
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={adjustedStyle.suggestionEntry}
                    >{entry.name}</Text>

                </View>
            </TouchableNativeFeedback>
        );

    }


    return (
        <AnimatedView

            style={adjustedStyle.container}
            duration={300}
           // useNativeDriver={true}
            onStartShouldSetResponder={() => {
                dismissKeyboard();
            }}
        >
            {
                renderInput()
            }
            {
                renderSuggestions()
            }
        </AnimatedView>
    );

}



const DEFAULT_SEARCH_HEADER_VIEW_STYLE = {
    container: {
        ...DEFAULT_DROP_SHADOW_STYLE,
        position: `absolute`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        zIndex: 10,
        elevation: 2,
        top: 0,
        width: `100%`,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    headerContainer:{
        ...BOX_SHADDOW,
        backgroundColor: "#fff",
        padding:20

    },
    header: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: LIGHT_COLOUR,
       
        height:40,
        borderRadius:30,
        paddingLeft:10,
        paddingRight:10
    },
    action: {
       
    },
    suggestion: {
        ...DEFAULT_DROP_SHADOW_STYLE,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        zIndex: 10,
        elevation: 2,
        marginVertical: 6,
        width: DEVICE_WIDTH,
        height: 0,
        // macHeight: DEVICE_HEIGHT,
        transform: [{
            translateY: DEVICE_HEIGHT
        }],
        backgroundColor: `#fdfdfd`
    },
    input: {
        flex: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        backgroundColor: 'transparent',

        marginLeft:5,
        marginRight:5,
        

    },
    suggestionEntry: {
        flex: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,

        marginLeft: 9,
        color: `#5d5d5d`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    icon: {
        width: 24,
        height: 24,
        margin: 6,
        tintColor: `#5d5d5d`,
        backgroundColor: `transparent`
    }
};

const adjustedStyle = StyleSheet.create(DEFAULT_SEARCH_HEADER_VIEW_STYLE);

export { AutoSuggeionSearch };