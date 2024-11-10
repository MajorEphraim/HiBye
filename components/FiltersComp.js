import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default FiltersComp=({placeholder, value, handleSearch})=>{
    return(
        <View style={styles.filtersContainer}>
            <TouchableOpacity style={{...styles.filterBar, backgroundColor:'#D9D9D9'}}>
                <Text style={{...styles.filterText,color:'#000'}}>requested</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.filterBar, backgroundColor:'#1AD166'}}>
                <Text style={{...styles.filterText,color:'#fff'}}>accepted</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.filterBar, backgroundColor:'#A30D5B'}}>
                <Text style={{...styles.filterText,color:'#fff'}}>request</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    filterBar:{
      width:90,
      height:30,
      color:'#000',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center'
    },
    filtersContainer:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:18,
      marginTop:10
    },
    filterText:{
        fontSize:13
    }
  });
  