import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyChats = ()=>{
  const navigation = useNavigation()
    return(
            
              <View style={styles.container}>
                  <TouchableWithoutFeedback onPress={()=>navigation.navigate("Chat messages")}>
                    <Text>View chat</Text>
                  </TouchableWithoutFeedback>
                  <StatusBar style="light" backgroundColor='#A30D5B'/>
              </View>
        
    )
}

export default MyChats

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  