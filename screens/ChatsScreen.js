import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatComp from '../components/ChatComp';

import pikachu from '../assets/pictures/pikachu.jpeg'
import chris from '../assets/pictures/chris.jpeg'
import abdul from '../assets/pictures/abdul.jpeg'
import tendai from '../assets/pictures/tendai.jpeg'

const chats = [
               {id:"1", name:"Pikachu", lastMessage:"Hello, how are you doing?", messsageCount:0, latestTime:"12:55", profilePic:pikachu},
               {id:"2",name:"Chris", lastMessage:"Bro, what up?", messsageCount:0, latestTime:"yesterday", profilePic:chris},
               {id:"3", name:"Abdul", lastMessage:"Was indeed an amazing adventure", messsageCount:3, latestTime:"02/10/2024", profilePic:abdul},
               {id:"4",name:"Tendai", lastMessage:"How did it go?", messsageCount:3, latestTime:"last week",profilePic:tendai}
              ]


const ChatsScreen = ()=>{
  const navigation = useNavigation()

  const handlePress = (id)=>{
    navigation.navigate("Chat messages",{id})
  }

    return(
            
              <View style={styles.container}>
                  <View style={styles.searchContainer}>
                    <TextInput placeholder='search by name' style={styles.searchBar} />
                  </View>
                    <FlatList
                        data={chats}
                        keyExtractor={item=>item.id}
                        style={styles.listContainer}
                        renderItem={({item})=>(
                          <ChatComp id={item.id} name={item.name} lastMessage={item.lastMessage} 
                            count={item.messsageCount} latestTime={item.latestTime} handlePress={handlePress}
                            pic={item.profilePic}
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
  