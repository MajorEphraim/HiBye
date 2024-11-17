import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions,
  TouchableWithoutFeedback, KeyboardAvoidingView, 
  Alert
 } from 'react-native';
import logo from '../assets/pictures/logo_t.png' 
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { signUpUser } from '../services/authService'
import TextInputComp from '../components/TextInputComp';
import LoaderModal from '../modals/LoaderModal';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Register = ()=>{

  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const showFeedback = (err)=>{
    Alert.alert(
      "Oops!",
      err,
      [
        { text: null, style: "cancel" },
        {
          text: "Okay",
          style: "destructive",
          onPress: async () => {
        
          },
        },
      ]
    );
  }


  const signUp = async()=>{
    if(email === '' || username === '' || password === '' || confirmPass === ''){
      showFeedback("All fields are required")
      return
    }

    if(password !== confirmPass){
      showFeedback("Paswords must match")
      return
    }

    try {
      setIsLoading(true)
      const resp = await signUpUser(username, email, password)
      
      if(resp.error)
        showFeedback(resp.message)
      else
        navigation.navigate("Login")
      setIsLoading(false)
    } catch (error) {
      showFeedback(error.message)
      setIsLoading(false)

    }

  }

    return(
            <View style={styles.container}>
                <View style={styles.welcome_logo}>
                    <Text style={styles.welcome_text}>Hi, welcome to</Text>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.signup_text}>Sign up here</Text>
                </View>
                <KeyboardAvoidingView style={styles.input_button}>
                    <TextInputComp placeholder={"username"} value={username} handleChange={setUsername}/>
                    <TextInputComp placeholder={"email"} value={email} handleChange={setEmail}/>
                    <TextInputComp placeholder={"password"} value={password} handleChange={setPassword}/>
                    <TextInputComp placeholder={"confirm password"} value={confirmPass} handleChange={setConfirmPass}/>
                    <Button name={"Register"} handlePress={signUp} />
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Login')}>
                     <Text style={styles.go_login}>Go to log in</Text>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <LoaderModal modalVisible={isLoading} handlePress={null}/>
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
      backgroundColor:'#b13476',
      borderBottomColor:'#cc7ca5',
      borderBottomWidth:3,
      borderStyle:'solid',
      color:'#fff',
      marginBottom:17,
      fontSize:15,
      paddingLeft:5
    },
    go_login:{
      fontSize:18,
      color:'#fff',
      marginTop:60
    }
  });
  