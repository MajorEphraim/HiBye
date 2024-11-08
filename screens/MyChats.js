import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const MyChats = ()=>{
    return(
            
              <View style={styles.container}>
                  <Text>MyChats</Text>
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
  