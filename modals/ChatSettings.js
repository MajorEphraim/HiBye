import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, 
    TouchableOpacity, Dimensions, FlatList,
    TouchableWithoutFeedback
 } from 'react-native';
 import { updateChat } from '../services/chatsService'

 const height = Dimensions.get('window').height
 const width = Dimensions.get('window').width



export default ChatSettings=({modalVisible, setModalVisible, backPicAllowed, blocked, friendId, id})=> {
  // State to control the modal visibility
  const isAllowed = backPicAllowed.includes(friendId)
  const isBlocked = blocked.includes(friendId)

  const handleBlock = async()=>{
    try {
      await updateChat({
        blocked: isBlocked ? blocked.filter(id=>id !==friendId) : [...blocked, friendId]
      },id)
      setModalVisible()
      
    } catch (error) {
        console.log(error.message)
    }
    setModalVisible()
  }

  const handleBackground = async()=>{
    try {
      await updateChat({
        backPicAllowed: isAllowed ? backPicAllowed.filter(id=>id !==friendId) : [...backPicAllowed, friendId]
      },id)
      setModalVisible()
      
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <View style={styles.container}>  
      <Modal
        animationType="fade"
        transparent={true}     
        visible={modalVisible}
        onRequestClose={() => setModalVisible()} 
      >
        <View style={styles.modalView}>
            <View style={styles.countContainer}>
                <TouchableWithoutFeedback onPress={handleBackground}>
                  <View style={styles.textContainer}>
                      <Text style={styles.text}> { isAllowed ? "Disable background image" :"Enable background image"}</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={handleBlock}>
                  <View style={styles.textContainer}>
                      <Text style={styles.text}> { isBlocked ? "Unblock chat": "Block chat"}</Text>
                  </View>
                </TouchableWithoutFeedback>

            </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex:1,
    flexDirection:'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent:'flex-end',
    paddingTop:75
  },
    countContainer:{
    backgroundColor:'#fff',
    flexDirection:'column',
    alignItems:'flex-start',
    padding:16,
  },
  textContainer:{
    flexDirection:'row',
    marginBottom:10
  },
  text:{
    fontSize:15,
  }
});
