import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { db, collection, query, where, onSnapshot } from '../firebase/configs';
import PicBackground from '../components/PicBackground';
import ConversationComp from '../components/ConversationComp';
import ChatSetting from '../modals/ChatSettings';
import { HeaderContext } from '../context/HeaderContext';
import { AuthContext } from '../context/AuthContext';
import { MyChatsContext } from '../context/MyChatsContext';
import { sendMessage, updateChat } from '../services/chatsService';
import { useRoute } from '@react-navigation/native';
import ContentLoader from '../components/ContentLoader';

const ChatMessages = () => {
  const { openOptions, toggleOpenOptions } = useContext(HeaderContext);
  const { userId } = useContext(AuthContext);
  const { updateMessages, chats, messages } = useContext(MyChatsContext);

  const route = useRoute();
  const id = route.params.id;

  const { chatIcon, backPicAllowed, blocked, friendId, lastSender } = chats.filter(
    (item) => item.id === id
  )[0];

  const [message, setMessage] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('chatId', '==', id));

    const unsubscribe = onSnapshot(q, (snap) => {
      const msgs = [];
      snap.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });

      updateMessages(msgs);
      setIsLoading(false); // Set loading to false after fetching the messages
    });

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    let isActive = true;

    const clearMessages = async () => {
      try {
        if (isActive && lastSender !== userId) {
          await updateChat({ unread: false, count: 0 }, id);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    clearMessages();

    return () => {
      isActive = false;
    };
  }, [messages]);

  const handlePress = async () => {
    if (message === '') return;
    const resp = await sendMessage(id, message, userId);
    setMessage('');
    if (resp.error) setErrMsg(errMsg);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ContentLoader />
      ) : (
        <>
          <PicBackground pic={chatIcon} />
          <ConversationComp
            chatId={id}
            isAllowed={backPicAllowed.includes(friendId)}
            handlePress={handlePress}
            message={message}
            setMessage={setMessage}
          />
        </>
      )}
      <ChatSetting
        modalVisible={openOptions}
        setModalVisible={toggleOpenOptions}
        backPicAllowed={backPicAllowed}
        blocked={blocked}
        friendId={friendId}
        id={id}
      />
    </View>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  picContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Ensures PicBackground doesn't take space from other components
  },
  pic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topContainer: {
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
});
