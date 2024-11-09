import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions,
  TextInput, TouchableWithoutFeedback, KeyboardAvoidingView
 } from 'react-native';
import logo from '../assets/pictures/logo_t.png' 
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Register = ()=>{

  const navigation = useNavigation()

  const signUp = ()=>{

  }

    return(
            <View style={styles.container}>
                <View style={styles.welcome_logo}>
                    <Text style={styles.welcome_text}>Hi, welcome to</Text>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.signup_text}>Sign up here</Text>
                </View>
                <KeyboardAvoidingView style={styles.input_button}>
                    <TextInput style={styles.input_field}/>
                    <TextInput style={styles.input_field}/>
                    <TextInput style={styles.input_field}/>
                    <TextInput style={styles.input_field}/>
                    <Button name={"Register"} handlePress={signUp} />
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Login')}>
                     <Text style={styles.go_login}>Go to log in</Text>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <StatusBar style="light" backgroundColor='#A30D5B'/>
            </View>
        
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#a30d5b',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop:.15*height,
      paddingBottom:.08*height
    },
    welcome_logo:{
      flexDirection:'column',
      alignItems:'center'
    },
    welcome_text:{
      color:'#fff',
      fontSize:.11*width
    },
    logo:{
      height:.383*width,
      width:.55*width
    },
    signup_text:{
      color:'#fff8f8',
      fontSize:.092*width,
      marginTop:10,
      marginBottom:15
    },
    input_button:{
      flexDirection:'column',
      alignItems:'center'
    },
    input_field:{
      width:.65*width,
      height:37,
      backgroundColor:'#fff',
      opacity:.2,
      borderBottomColor:'#fff',
      borderBottomWidth:3,
      borderStyle:'solid',
      color:'#fff',
      marginBottom:17
    },
    go_login:{
      fontSize:18,
      color:'#fff',
      marginTop:60
    }
  });
  