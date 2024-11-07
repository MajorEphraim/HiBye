import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Account = ()=>{
    return(
        
            <View style={styles.container}>
                <Text>Account</Text>
            <StatusBar style="auto" />
            </View>
        
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  