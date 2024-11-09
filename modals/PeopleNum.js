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

export default PeopleNum=({modalVisible, setModalVisible})=> {
  // State to control the modal visibility
  const handlePress = ()=>{
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
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}># people to find</Text>
                </View>

                <FlatList
                    data={data}
                    style={styles.listContainer}
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.numContainer} onPress={handlePress}>
                            <Text style={styles.count}>{item.count}</Text>
                        </TouchableOpacity>
                    )}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection:'column',
  },
    countContainer:{
    height:.2*height,
    backgroundColor:'#fff',
    flexDirection:'column',
    alignItems:'center',
    padding:16,
    marginTop:.15*height,
    borderRadius:10
  },
  headingContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  heading:{
    fontSize:.043*width,
    color:'#000',
    marginRight:5
  },
  count:{
    fontSize:.05*width,
    color:'#00',
  },
  listContainer:{
    marginTop:17,
  },
  numContainer:{
    flexDirection:'column',
    alignItems:'center',
  }
});
