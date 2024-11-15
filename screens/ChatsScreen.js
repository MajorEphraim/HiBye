import React,{ useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatComp from '../components/ChatComp';
import SearchBar from '../components/SearchBar';
import { MyChatsContext } from '../context/MyChatsContext'
import { ChatHeaderContext } from '../context/ChatHeaderContext'

import pikachu from '../assets/pictures/pikachu.jpeg'
import chris from '../assets/pictures/chris.jpeg'
import abdul from '../assets/pictures/abdul.jpeg'
import tendai from '../assets/pictures/tendai.jpeg'


const ChatsScreen = ()=>{

  const navigation = useNavigation()
  const [search, setSearch] = useState('')

  const { chats } = useContext(MyChatsContext)
  const { updateHeaderInfo } = useContext(ChatHeaderContext)


  const handlePress = (id, chatName, chatIcon, backPicAllowed, blocked, friendId)=>{
    updateHeaderInfo({chatName, chatIcon})
    navigation.navigate("Chat messages",{id, chatIcon, backPicAllowed, blocked, friendId})
  }

  const handleSearch = (val)=>{
    setSearch(val)
  }

    return(
            
              <View style={styles.container}>
                    <SearchBar placeholder={"search by name"} value={search} handleSearch={handleSearch} />
                    <FlatList
                        data={chats}
                        keyExtractor={item=>item.id}
                        style={styles.listContainer}
                        renderItem={({item})=>(
                          <ChatComp id={item.id} name={item.chatName} lastMessage={item.lastMessage} 
                            count={0} latestTime={item.timeSent} handlePress={handlePress}
                            pic={item.chatIcon} lastSender={item.lastSender} unread={false} 
                            isAllowed={item.backPicAllowed} isBlocked={item.blocked} friendId={item.friendId}
                          />
                        )}               
                    />
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
  