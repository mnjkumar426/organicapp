import React from 'react'
import { StyleSheet } from 'react-native';
import { Text ,View} from 'react-native'
import { AutoSuggeionSearch } from '../../components/Search';


export const  SearchScreen=()=> {
    return (
        <View style={styles.container}>
            <AutoSuggeionSearch 
            onGetAutocompletions = {async (text) => {
                if (text) {
                    const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                        method: `get`
                    });
                    console.log("call api")
                    const data = await response.json();
                    return data[1];
                } else {
                    return [];
                }
            }}
            
            ></AutoSuggeionSearch>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor:'red'
      
    },
  });
  
