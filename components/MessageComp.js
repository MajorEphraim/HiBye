import { View, Text, StyleSheet, Dimensions  } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const userId ="123"

export default MessageComp=({message,timeSent, senderId})=>{
    return(
        <View style={{...styles.container,alignItems:senderId === userId ? 'flex-end':'flex-start'}}>
            <View style={{...styles.messageContainer,backgroundColor: senderId === userId ? '#676262' :'#A30D5B'}}>
                <Text style={styles.message}>{message}</Text>
            </View>
            <Text style={styles.time}>{timeSent}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginBottom:17
    },
    messageContainer:{
        maxWidth:0.64*width,
        borderRadius:0.027*width,
        padding:5
    },
    message:{
        color:'#fff',
        fontSize:0.037*width,
    },
    time:{
        color:'#000',
        fontSize:0.034*width,
    }

})

