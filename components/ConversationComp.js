import { Text, View, StyleSheet, FlatList } from "react-native";
import MessageComp from "./MessageComp";

const messages = [
    {id:'1', message:'Hi...', senderId:'11', timeSent:'09:00',},
    {id:'2', message:'Hey!', senderId:'123', timeSent:'09:02',},
    {id:'3', message:'What do you think about the match?', senderId:'11', timeSent:'09:06',},
    {id:'4', message:'Honestly speaking, it was an amazingone, especial towards the end..... how was it for you?', senderId:'123', timeSent:'09:10',},
    {id:'5', message:'I feel the same way, it was one of the best ones I’ve ever watched.', senderId:'11', timeSent:'09:17',},
  ]

export default ConversationComp =({isAllowed})=>{
    return (
        <View style={{...styles.container,backgroundColor:isAllowed ? 'transparent' :'#fff'}}>
            <FlatList
                data={messages}
                style={styles.listContainer}
                renderItem={({item})=>(
                    <MessageComp message={item.message} timeSent={item.timeSent} senderId={item.senderId}/>
                )}
            />
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
        backgroundColor: '#000',
        zIndex: 3,
    },
    listContainer:{
        padding:10
    }
});
