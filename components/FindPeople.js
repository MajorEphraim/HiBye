import React,{ useState } from 'react';
import { TouchableWithoutFeedback, View, Text, 
    StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchBar from './SearchBar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default FindPeople = ({updatePeople, search, setSearch})=>{

    const handlePress = async()=>{
      await updatePeople()
    }
  
    return(
        <View style={styles.container}>
            <SearchBar 
                placeholder={"search by name or email"} 
                value={search} 
                handleSearch={setSearch}
            />
            <TouchableOpacity onPress={handlePress}>
                <MaterialIcons name="refresh" size={32} color="#A30D5B" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        
    },
    textContainer:{
        borderColor:'#A30D5B',
        borderWidth:1,
        borderStyle:'solid',
        backgroundColor:'#fcf3f3',
        marginRight:15,
    },
    text:{
        fontSize:21,
        color:'#000',
        fontWeight:'bold',
        padding:10
    }
})