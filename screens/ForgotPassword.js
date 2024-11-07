import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const ForgotPassword = ()=>{
    return(
        
            <View style={styles.container}>
                <Text>Forgot Password</Text>
            <StatusBar style="auto" />
            </View>
        
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  