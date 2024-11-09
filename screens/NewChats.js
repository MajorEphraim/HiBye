import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FindPeople from '../components/FindPeople';
import PersonComp from '../components/PersonComp';


import pikachu from '../assets/pictures/pikachu.jpeg'
import chris from '../assets/pictures/chris.jpeg'
import abdul from '../assets/pictures/abdul.jpeg'
import tendai from '../assets/pictures/tendai.jpeg'

const chats = [
               {id:"1", name:"Pikachu", status:"request", profilePic:pikachu},
               {id:"2",name:"Chris", status:"requested", profilePic:chris},
               {id:"3", name:"Abdul", status:"request", profilePic:abdul},
               {id:"4",name:"Tendai", status:"accepted", profilePic:tendai},
               {id:"5", name:"Abdul", status:"request", profilePic:abdul},
               {id:"6",name:"Tendai", status:"accepted", profilePic:tendai},
              ]

const NewChats = ()=>{

  const handlePress = ()=>{

  }
  
    return(
        
            <View style={styles.container}>
              <FindPeople/>
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
  });
  