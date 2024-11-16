import { useContext } from "react";
import { Text, View, StyleSheet, FlatList, 
        TextInput, TouchableWithoutFeedback } from "react-native";
import MessageComp from "./MessageComp";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { sendMessage } from "../services/chatsService";
import { AuthContext } from '../context/AuthContext'
import { MyChatsContext } from '../context/MyChatsContext'

export default ConversationComp =({chatId, isAllowed, handlePress, message, setMessage})=>{
    const { messages }  = useContext(MyChatsContext)
    return (
        <View style={{...styles.container,backgroundColor:isAllowed ? 'transparent' :'#fff'}}>
            <FlatList
                data={messages.filter(item => item.chatId === chatId)
                              .sort((a, b) => a.timestamp - b.timestamp)}
                style={styles.listContainer}
                renderItem={({item})=>(
                    <MessageComp message={item.message} timeSent={item.timeSent} 
                    senderId={item.senderId} 
                    />
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
