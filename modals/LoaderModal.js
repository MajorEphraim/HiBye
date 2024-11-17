import { View, Text, Modal, StyleSheet,
   TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator
   } from 'react-native';

const LoaderModal = ({ modalVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalOverlay}>
          <ActivityIndicator size={'large'} color={"#fff"} />
      </View>
    </Modal>
  );
};

export default LoaderModal; // Separate the export from the function


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  overlay: {
    flex: 1,
  },
  modalContent: {
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
