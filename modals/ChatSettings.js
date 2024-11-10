import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, 
    TouchableOpacity, Dimensions, FlatList,
    TouchableWithoutFeedback
 } from 'react-native';
 import AntDesign from '@expo/vector-icons/AntDesign';
 import RequestComp from '../components/RequestComp';

 const height = Dimensions.get('window').height
 const width = Dimensions.get('window').width

const data = [
    {id:"1", count:10},
    {id:"2",count:100},
    {id:"3", count:1000},
]

export default ChatSettings=({modalVisible, setModalVisible})=> {
  // State to control the modal visibility
  const handleBlock = ()=>{
    setModalVisible(false)
  }

  const handleBackground = ()=>{
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>  
      <Modal
        animationType="slide"
        transparent={true}     
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalView}>
            <View style={styles.countContainer}>
                <TouchableWithoutFeedback onPress={handleBlock}>
                  <View style={styles.textContainer}>
                      <Text style={styles.text}>Disable background image</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={handleBlock}>
                  <View style={styles.textContainer}>
                      <Text style={styles.text}>Block chat</Text>
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
