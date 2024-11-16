import { useState, useContext, useEffect } from 'react'
import {View, Text, StyleSheet, 
    TouchableWithoutFeedback, Image} from 'react-native'
import {AuthContext} from '../context/AuthContext'
import { timeAgo } from '../services/chatsService'

export default ChatComp =({id, name, lastMessage, count, latestTime, handlePress, pic, lastSender, unread, isAllowed, isBlocked, friendId})=>{
    const { userId } = useContext(AuthContext);
    const [time, setTime] = useState();
    
    useEffect(() => {
        const update = () => {
            setTime(timeAgo(latestTime));
            setTimeout(update, 10000);
        };
    
        update();
    
        return () => clearTimeout(); 
    }, [latestTime]);
    
    return(
        <TouchableWithoutFeedback id={id} onPress={()=>handlePress(id, name, pic, isAllowed, isBlocked, friendId)}>
            <View style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri:pic}} style={styles.pic}/>
                    </View>

                    <View style={styles.name_message}>
                        <Text style={styles.name}>{name}</Text>
                        {
                            lastMessage === null ?(
                                <Text style={styles.firstMessage} numberOfLines={1}>Say hi! to your new friend</Text>

                            ):(
                                
                                <Text style={{...styles.lastMessage,fontWeight: unread && lastSender !== userId ? 'bold':null}} numberOfLines={1}>{ lastSender === userId ?"You: "+ lastMessage:lastMessage}</Text>
                            )
                        }
                    </View>
                </View>

                <View style={styles.secView}>
                    {
                        count > 1 && lastSender !== userId ? (
                            <View style={styles.messageBadge}>
                                <Text style={styles.messageCount}>{count}</Text>
                            </View>

                        ):(null)
                    }
                </View>

                <View style={styles.lastView}>
                {
                            lastMessage === null ?(
                                <View/>

                            ):(
                                
                                <Text style={{...styles.latestTime,...(unread && lastSender !== userId ?{color:'#AD3173',fontWeight:'bold'}:{color:'#000',fontWeight:null})}}>{time}</Text>
                            )
                        }
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
    firstMessage:{
        fontSize:14,
        color:'#A30D5B',
        fontStyle:'italic',
        fontWeight:'bold'
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