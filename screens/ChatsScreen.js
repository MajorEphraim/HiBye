import React,{ useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatComp from '../components/ChatComp';
import SearchBar from '../components/SearchBar';
import { MyChatsContext } from '../context/MyChatsContext'
import { ChatHeaderContext } from '../context/ChatHeaderContext'
import EmptyScreen from '../components/EmptyScreen';
import ContentLoader from '../components/ContentLoader';

const ChatsScreen = ()=>{

  const navigation = useNavigation()
  const [search, setSearch] = useState('')

  const { chats, isLoading } = useContext(MyChatsContext)
  const { updateHeaderInfo } = useContext(ChatHeaderContext)

  const handlePress = (id, chatName, chatIcon)=>{
    updateHeaderInfo({chatName, chatIcon})
    navigation.navigate("Chat messages",{id})
  }
  
  const handleSearch = (val)=>{
    setSearch(val)
  }

    return(
            
              <View style={styles.container}>
                {isLoading ? null :<SearchBar placeholder={"search by name"} value={search} handleSearch={handleSearch} />}                    

                {
                      isLoading ? (
                        <ContentLoader/>
                      ):(  
                          chats.length ==0 ?(
                            <EmptyScreen/>
                          ):(
                            <FlatList
                                data={chats
                                  .filter(item=>(item.chatName.toLowerCase().includes(search.toLowerCase())))
                                  .sort((a, b) => b.timeSent - a.timeSent)}
                                keyExtractor={item=>item.id}
                                style={styles.listContainer}
                                renderItem={({item})=>(
                                  <ChatComp id={item.id} name={item.chatName} lastMessage={item.lastMessage} 
                                    count={item.count} latestTime={item.timeSent} handlePress={handlePress}
                                    pic={item.chatIcon} lastSender={item.lastSender} unread={item.unread} 
                                    isAllowed={item.backPicAllowed} isBlocked={item.blocked} friendId={item.friendId}
                                    />
                                  )}               
                                  />
                                )
                          )
                    }
                    <StatusBar style="light" backgroundColor='#A30D5B'/>
              </View>
        
    )
}

export default ChatsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContainer:{
      marginTop:10,
      margin:5
    },
    searchBar:{
      width:"60%",
      height:40,
      borderColor:'#A30D5B',
      borderWidth:2,
      borderStyle:'solid',
      color:'#000',
      margin:10,
      borderRadius:20,
      padding:10,
    },
    searchContainer:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'flex-start'
    }
  });
  