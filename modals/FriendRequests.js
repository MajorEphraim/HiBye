import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, 
    TouchableWithoutFeedback, Dimensions, FlatList
 } from 'react-native';
 import AntDesign from '@expo/vector-icons/AntDesign';
 import RequestComp from '../components/RequestComp';

 const height = Dimensions.get('window').height
 const width = Dimensions.get('window').width

export default FriendRequests=({requests,modalVisible, setModalVisible})=> {
  // State to control the modal visibility
  
  return (
    <View style={styles.container}>  
      <Modal
        animationType="slide"
        transparent={true}     
        visible={modalVisible}
        onRequestClose={() => setModalVisible()} 
      >
        <View style={styles.modalView}>
            <View style={styles.closeContainer} >
                <TouchableWithoutFeedback onPress={() => setModalVisible()}>
                    <AntDesign name="close" size={30} color="#fff" />
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.requestsContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Friend requests</Text>
                    <View style={styles.badge}>
                        <Text style={styles.count}>{requests.length}</Text>
                    </View>
                </View>

                <FlatList
                    data={requests}
                      style={styles.listContainer}
                      renderItem={({item})=><RequestComp id={item.id}
                                                  name={item.username} 
                                                  pic={item.profilePic} 
                                                  status={item.status} 
                                                  date={item.dateSent}
                                                  senderId={item.senderId}  
                                                  />}
                />
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'space-between',
    paddingBottom:.09*height,
  },
  closeContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  requestsContainer:{
    height:.79*height,
    width:.95*width,
    backgroundColor:'#fff',
    flexDirection:'column',
    alignItems:'center',
    paddingTop:16
  },
  headingContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  heading:{
    fontSize:.063*width,
    color:'#000',
    marginRight:5
  },
  badge:{
    backgroundColor:'#ed3333',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    height:27,
    width:27,
  },
  count:{
    fontSize:.05*width,
    color:'#fff',
  },
  listContainer:{
    width:'90%',
    marginTop:17
  }
});
