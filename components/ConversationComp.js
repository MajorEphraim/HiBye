import { Text, View, StyleSheet, FlatList, 
        TextInput, TouchableWithoutFeedback } from "react-native";
import MessageComp from "./MessageComp";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { sendMessage } from "../services/chatsService";
import { AuthContext } from '../context/AuthContext'


const messages = [
    {id:'1', message:'Hi...', senderId:'11', timeSent:'09:00',},
    {id:'2', message:'Hey!', senderId:'123', timeSent:'09:02',},
    {id:'3', message:'What do you think about the match?', senderId:'11', timeSent:'09:06',},
    {id:'4', message:'Honestly speaking, it was an amazingone, especial towards the end..... how was it for you?', senderId:'123', timeSent:'09:10',},
    {id:'5', message:'I feel the same way, it was one of the best ones I’ve ever watched.', senderId:'11', timeSent:'09:17',},
  ]

export default ConversationComp =({chatId, isAllowed, handlePress, message, setMessage})=>{

    return (
        <View style={{...styles.container,backgroundColor:isAllowed ? 'transparent' :'#fff'}}>
            <FlatList
                data={messages}
                style={styles.listContainer}
                renderItem={({item})=>(
                    <MessageComp message={item.message} timeSent={item.timeSent} senderId={item.senderId}/>
                )}
            />
            <View style={styles.sendMessage}>
                <TextInput placeholder="Type message here" 
                           style={styles.messageField}
                           multiline={true}
                           value={message}
                           onChangeText={val=>setMessage(val)}
                           />
                <TouchableWithoutFeedback onPress={()=>handlePress()}>
                    <FontAwesome6 name="paper-plane" size={20} color="#676262"/>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    listContainer:{
        padding:10
    },
    sendMessage:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:10
        
    },
    messageField:{
        width:"80%",
        backgroundColor:"#D9D9D9",
        padding:5,
        marginRight:20
    }
});
