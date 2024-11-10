import { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList
 } from 'react-native';
import PicBackground from '../components/PicBackground';
import ConversationComp from '../components/ConversationComp';
import ChatSetting from '../modals/ChatSettings';
import { HeaderContext } from '../context/HeaderContext';

import pikachu from '../assets/pictures/pikachu.jpeg'

const isAllowed = true


const ChatMessages = ()=>{
  const { openOptions, toggleOpenOptions } = useContext(HeaderContext)

    return(
      <View style={styles.container}>
        <PicBackground pic ={pikachu}/>
        <ConversationComp isAllowed={isAllowed}/>
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
