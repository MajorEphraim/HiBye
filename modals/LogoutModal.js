import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default LogoutModal = ({ modalVisible, setModalVisible }) => {

  const handlePress = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        {/* Actual modal content */}
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handlePress} style={styles.textContainer}>
            <Text style={styles.text}>Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Background overlay to close modal when tapping outside */}
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop:75

  },
  textContainer: {
    paddingVertical: 10,
    alignItems:'center'
  },
  text: {
    fontSize: 15,
  },
});
