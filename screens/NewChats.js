import { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FindPeople from '../components/FindPeople';
import PersonComp from '../components/PersonComp';
import FriendRequests from '../modals/FriendRequests';
import PeopleNum from '../modals/PeopleNum';
import FiltersComp from '../components/FiltersComp';
import { HeaderContext } from '../context/HeaderContext';
import { NewChatsContext } from '../context/NewChatsContext';


import pikachu from '../assets/pictures/jackie.jpg'
import chris from '../assets/pictures/zero two.jpeg'
import abdul from '../assets/pictures/tommy.jpeg'
import tendai from '../assets/pictures/emily.jpeg'
import ntando from '../assets/pictures/ntando.jpeg'
import debra from '../assets/pictures/debra.jpeg'

const chats = [
               {id:"1", name:"Jackie", status:"request", profilePic:pikachu},
               {id:"2",name:"Zero Two", status:"requested", profilePic:chris},
               {id:"3", name:"Tommy", status:"request", profilePic:abdul},
               {id:"4",name:"Emily", status:"accepted", profilePic:tendai},
               {id:"5", name:"Ntando", status:"request", profilePic:ntando},
               {id:"6",name:"Debra", status:"accepted", profilePic:debra},
              ]

const NewChats = ()=>{

  const [isVisible, setIsVisible] = useState(false)
  const { openRequest, toggleOpenRequest } = useContext(HeaderContext)
  const { people, isLoading, errorM ,updatePeople } = useContext(NewChatsContext)

  console.log("PEOPLE, ",people)
  const handlePress = ()=>{
 
  }

    return(
        
            <View style={styles.container}>
              <FindPeople updatePeople={updatePeople} setIsVisible={setIsVisible}/>
              <FiltersComp/>
              <FlatList
                 data={chats}
                 keyExtractor={item=>item.id}
                 style={styles.listContainer}
                 renderItem={({item})=>(
                   <PersonComp id={item.id} name={item.name} handlePress={handlePress}
                              pic={item.profilePic} status={item.status}
                   />
                  )}               
                  />
                <FriendRequests modalVisible={openRequest} setModalVisible={toggleOpenRequest}/>
                <PeopleNum modalVisible={isVisible} setModalVisible={setIsVisible}/>
                <StatusBar style="light" backgroundColor='#A30D5B'/>
              </View>
        
    )
}

export default NewChats

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContainer:{
      marginHorizontal:12,
      marginTop:20
    }
  });
  