import {View, StyleSheet, TextInput} from 'react-native'

export default SearchBar=({placeholder, value, handleSearch})=>{
    return(
            <TextInput 
            placeholder={placeholder} 
            value={value} style={styles.searchBar}
            onChangeText={val=>handleSearch(val)}
            />
    )
}

const styles = StyleSheet.create({
    searchBar:{
      width:"70%",
      height:40,
      borderColor:'#A30D5B',
      borderWidth:2,
      borderStyle:'solid',
      color:'#000',
      margin:10,
      borderRadius:20,
      padding:10,
    },
    searchContainer:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'flex-start',
      backgroundColor:'blue'
    }
  });
  