import { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FindPeople from '../components/FindPeople';
import PersonComp from '../components/PersonComp';
import FriendRequests from '../modals/FriendRequests';
import PeopleNum from '../modals/PeopleNum';
import FiltersComp from '../components/FiltersComp';
import { HeaderContext } from '../context/HeaderContext';
import { NewChatsContext } from '../context/NewChatsContext';

const NewChats = ()=>{

  const [isVisible, setIsVisible] = useState(false)
  const { openRequest, toggleOpenRequest } = useContext(HeaderContext)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const { people, isLoading, errorM ,updatePeople } = useContext(NewChatsContext)

    useEffect(()=>{
        updatePeople()
        console.log(people)
    },[])

    const handlePress = ()=>{
      
    }

    return(
        
            <View style={styles.container}>
              <FindPeople updatePeople={updatePeople} search={search} setSearch={setSearch}/>
              <FiltersComp setStatus={setStatus}/>
              <FlatList
                 data={people && people.filter(item=>(item.username.toLowerCase().includes(search.toLowerCase())
                 || item.email.toLowerCase().includes(search.toLowerCase()))
                 && item.status.includes(status)
                )}
                 keyExtractor={item=>item.id}
                 style={styles.listContainer}
                 renderItem={({item})=>(
                   <PersonComp id={item.id} name={item.username} handlePress={handlePress}
                              pic={item.profilePic} status={"request"}
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
  