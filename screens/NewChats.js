import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const NewChats = ()=>{
    return(
        
            <View style={styles.container}>
                <Text>NewChats</Text>
            </View>
        
    )
}

export default NewChats

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  