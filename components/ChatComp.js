import {View, Text, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native'

const userId = "0123"

export default ChatComp =({id, name, lastMessage, count, latestTime, handlePress, pic, lastSender, unread})=>{
    return(
        <TouchableWithoutFeedback id={id} onPress={()=>handlePress(id)}>
            <View style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={pic} style={styles.pic}/>
                    </View>

                    <View style={styles.name_message}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={{...styles.lastMessage,fontWeight: unread ? 'bold':null}} numberOfLines={1}>{ lastSender === userId ?"You: "+ lastMessage:lastMessage}</Text>
                    </View>
                </View>

                <View style={styles.secView}>
                    {
                        count > 1 ? (
                            <View style={styles.messageBadge}>
                                <Text style={styles.messageCount}>{count}</Text>
                            </View>

                        ):(null)
                    }
                </View>

                <View style={styles.lastView}>
                    <Text style={{...styles.latestTime,...(unread && lastSender !== userId ?{color:'#AD3173',fontWeight:'bold'}:{color:'#000',fontWeight:null})}}>{latestTime}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        height:65,
        width:'100%',
        flexDirection:'row',
        padding:5,
        marginBottom:5
    },

    firstView:{
        flexDirection:'row',
        alignItems:'center',
        flex:6,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        overflow:'hidden',
        paddingRight:3
    },
    secView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    lastView:{
        flex:2,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    imageContainer:{
        height:50,
        width:50,
        borderRadius:100,
        backgroundColor:'#A30D5B',
        marginRight:15
    },
    pic:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
    name:{
        fontSize:22
    },
    lastMessage:{
        fontSize:14,
    },
    messageBadge:{
        width:30,
        height:30,
        borderRadius:100,
        backgroundColor:'#D9D9D9',
        justifyContent:'center',
        alignItems:'center'
    },
    messageCount:{
        fontSize:13,
        fontWeight:'bold',
        color:'#000'
    },
    name_message:{
        flexDirection:'column',
        alignSelf:'flex-start',
        justifyContent:'center',
        paddingVertical:10,
        maxWidth:200
    },
    latestTime:{
        fontSize:12
    }
})