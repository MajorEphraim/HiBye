import react from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default Button = ({name, handlePress})=>{
    return(
        <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.button}>
          <Text style={styles.button_text}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#fff",
        width:.5*width,
        height:41,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
      },
      button_text:{
        fontSize:17
      },
})