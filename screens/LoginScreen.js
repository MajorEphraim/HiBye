import React,{useState,useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions,
  TouchableWithoutFeedback, KeyboardAvoidingView, Alert,
  Keyboard
 } from 'react-native';
import logo from '../assets/pictures/logo_t.png' 
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext' 
import TextInputComp from '../components/TextInputComp';
import LoaderModal from '../modals/LoaderModal';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Login = ()=>{
  const {signIn, isLoading, errorMsg } = useContext(AuthContext)
  
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)
  

  
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

  useEffect(()=>{
    if(errorMsg)
      showFeedback(errorMsg)
  },[errorMsg])

  const signInUser = async()=>{

      if(email === '' || password ===''){
        showFeedback("All fields are required")
        return
      }
      
      try {
        await signIn(email, password)
      } catch (error) {
        showFeedback(error.message)
      }
  }
    return(
            <View style={styles.container}>
                <View style={styles.welcome_logo}>
                    <Text style={styles.welcome_text}>Hi, welcome to</Text>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.signin_text}>Sign in here</Text>
                </View>
                <KeyboardAvoidingView style={styles.input_button}>
                    <TextInputComp placeholder={"email"} value={email} handleChange={setEmail}/>
                    <TextInputComp placeholder={"password"} value={password} handleChange={setPassword}/>
                    <Button name={"Log in"} handlePress={signInUser} />

                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Forgot password')}>
                     <Text style={styles.forgot_pass}>Forgot password?</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Register')}>
                     <Text style={styles.create_account}>Create an account</Text>
                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView>
                <LoaderModal modalVisible={isLoading} handlePress={null}/>
                <StatusBar style="light" backgroundColor='#A30D5B'/>
            </View>
        
    )
}

export default Login

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
    signin_text:{
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
    create_account:{
      fontSize:18,
      color:'#fff',
      marginTop:60
    },
    forgot_pass:{

    }
  });
  