import { View, Text, StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default EmptyScreen=()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text1}>It’s a bit quiet here...</Text>
            <Text style={styles.text2}>Tap on New Chat to connect with friends and start chatting!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:25,
        paddingBottom:.2*height
    },
    text1:{
        fontSize:.09*width,
        color:'#676262',
        opacity:.4,
        textAlign:'center',
        marginBottom:.04*height
    },
    text2:{
        fontSize:.06*width,
        color:'#676262',
        opacity:.4,
        textAlign:'center'
    },
})