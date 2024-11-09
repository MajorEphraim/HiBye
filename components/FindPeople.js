import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default FindPeople = ()=>{
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Press to find 10 people</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <AntDesign name="caretdown" size={27} color="#A30D5B" />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
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