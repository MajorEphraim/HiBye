import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

export default FriendRequests=({modalVisible, setModalVisible})=> {
  // State to control the modal visibility
  
  return (
    <View style={styles.container}>
      {/* Button to trigger the modal */}
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      
      {/* Modal component */}
      <Modal
        animationType="slide"
        transparent={true}     
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalView}>

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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
