import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const ChatMessages = ()=>{
    return(
        
            <View style={styles.container}>
                <Text>ChatMessages</Text>
                <StatusBar style="light" backgroundColor='#A30D5B'/>
            </View>
        
    )
}

export default ChatMessages

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  