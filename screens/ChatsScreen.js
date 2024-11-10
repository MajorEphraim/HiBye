import React,{ useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatComp from '../components/ChatComp';
import SearchBar from '../components/SearchBar';


import pikachu from '../assets/pictures/pikachu.jpeg'
import chris from '../assets/pictures/chris.jpeg'
import abdul from '../assets/pictures/abdul.jpeg'
import tendai from '../assets/pictures/tendai.jpeg'

const chats = [
               {id:"1", name:"Pikachu", lastMessage:"Hello, how are you doing?", messsageCount:0, latestTime:"12:55", profilePic:pikachu, lastSender:'01', unread:false},
               {id:"2",name:"Chris", lastMessage:"Bro, what up?", messsageCount:1, latestTime:"yesterday", profilePic:chris, lastSender:'01', unread:true},
               {id:"3", name:"Abdul", lastMessage:"Was indeed an amazing adventure", messsageCount:3, latestTime:"02/10/2024", profilePic:abdul, lastSender:'01', unread:true},
               {id:"4",name:"Tendai", lastMessage:"How did it go?", messsageCount:1, latestTime:"last week",profilePic:tendai, lastSender:'0123', unread:false}
              ]


const ChatsScreen = ()=>{
  const navigation = useNavigation()
  const [search, setSearch] = useState('')

  const handlePress = (id)=>{
    navigation.navigate("Chat messages",{id})
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
                          <ChatComp id={item.id} name={item.name} lastMessage={item.lastMessage} 
                            count={item.messsageCount} latestTime={item.latestTime} handlePress={handlePress}
                            pic={item.profilePic} lastSender={item.lastSender} unread={item.unread}
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
  