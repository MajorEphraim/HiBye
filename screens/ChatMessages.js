import { useState, useContext } from 'react';
import { StyleSheet, View,
 } from 'react-native';
import PicBackground from '../components/PicBackground';
import ConversationComp from '../components/ConversationComp';
import ChatSetting from '../modals/ChatSettings';
import { HeaderContext } from '../context/HeaderContext';
import { AuthContext } from '../context/AuthContext';
import { sendMessage } from '../services/chatsService';
import { useRoute } from '@react-navigation/native';

const ChatMessages = ()=>{
  const { openOptions, toggleOpenOptions } = useContext(HeaderContext)
  const { userId } = useContext(AuthContext)

  const route = useRoute()

  const {id, chatIcon, backPicAllowed, blocked, friendId} = route.params

  const [message, setMessage] = useState('')
  const [errMsg, setErrMsg] = useState(null)


  const handlePress =async()=>{
    if(message === '')
      return
    const resp = await sendMessage(id, message, userId)
    setMessage('')
    if(resp.error)
      setErrMsg(errMsg)
  }

    return(
      <View style={styles.container}>
        <PicBackground pic ={chatIcon}/>
        <ConversationComp chatId={id} isAllowed={backPicAllowed.includes(friendId)} 
        handlePress={handlePress} message={message}
        setMessage={setMessage}
        />
        <ChatSetting modalVisible={openOptions} setModalVisible={toggleOpenOptions}/>
      </View>
    )
}

export default ChatMessages

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  topContainer:{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      zIndex: 3,
  },
  whiteContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      opacity: 0.65,
      zIndex: 2,
  },
  picContainer: {
      width: '100%',
      height: '100%',
  },
  pic: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  }
});
