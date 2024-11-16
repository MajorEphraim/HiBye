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
import { AuthContext } from '../context/AuthContext';
import { RequestsContext } from '../context/RequestsContext';
import { sendRequests } from '../services/requestsService'

const NewChats = ()=>{

  const [isVisible, setIsVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [erMsg, setErMsg] = useState(null)
  
  const { openRequest, toggleOpenRequest } = useContext(HeaderContext)
  const { people, isLoading, errorM ,updatePeople } = useContext(NewChatsContext)
  const { userId } = useContext(AuthContext)
  const { requestInfo_r, requestInfo_s } = useContext(RequestsContext)

  const [data, setData] = useState(people)

  useEffect(()=>{
    updatePeople()
  },[])

  useEffect(() => {
    if (people && people.length > 0) {
      setData(people);
    }
  }, [people]);


  useEffect(()=>{
    ///csetData(prev=>mergeItems(prev,requestInfo_s))
  },[requestInfo_s])

    const handlePress = async(personId)=>{
      try {
        await sendRequests(userId, personId)
      } catch (error) {
        setErMsg(error.message)
      }
    }

    //console.log("requestInfo_r ID::", requestInfo_r)
    //console.log("USER ID::", userId)

    return(
        
            <View style={styles.container}>
              <FindPeople updatePeople={updatePeople} search={search} setSearch={setSearch}/>
              <FiltersComp setStatus={setStatus}/>
              <FlatList
                 data={data && data.filter(item=>(item.username.toLowerCase().includes(search.toLowerCase())
                 || item.email.toLowerCase().includes(search.toLowerCase()))
                 && item.status.includes(status)
                )}
                 keyExtractor={item=>item.id}
                 style={styles.listContainer}
                 renderItem={({item})=>(
                   <PersonComp id={item.id} name={item.username} handlePress={handlePress}
                              pic={item.profilePic} status={item.status}
                   />
                  )}               
                  />
                <FriendRequests requests={requestInfo_r.filter(item=>item.receiverId === userId)} modalVisible={openRequest} setModalVisible={toggleOpenRequest}/>
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
  