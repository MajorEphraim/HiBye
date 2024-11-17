import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions,
  TextInput,
 } from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default TextInputComp=({placeholder, value, handleChange})=>{

    return(<TextInput 
    placeholder={placeholder} 
    placeholderTextColor={'#cc7ca5'}
    style={styles.input_field}
    value={value}
    onChangeText={val=>handleChange(val)}
    />)
}

const styles = StyleSheet.create({
    input_field:{
        width:.65*width,
        height:37,
        backgroundColor:'#b13476',
        borderBottomColor:'#cc7ca5',
        borderBottomWidth:3,
        borderStyle:'solid',
        color:'#fff',
        marginBottom:17,
        fontSize:15,
        paddingLeft:5,
        paddingBottom:0
      },
})