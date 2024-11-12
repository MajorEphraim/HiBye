import { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, 
        Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import LogoutModal from '../modals/LogoutModal';
import { HeaderContext } from '../context/HeaderContext';
import { AuthContext } from '../context/AuthContext';
import { AccountContext } from '../context/AccountContext'
import { pickImage, uploadImage } from '../services/mediaService'


import thulani from '../assets/pictures/thulani.jpg'


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AccountScreen = ()=>{
    const { openLogout, toggleOpenLogout } = useContext(HeaderContext)
    const {userId ,signOut, errorMsg } = useContext(AuthContext)
    const { erMsg, account, updatePic, updateAccount , updateName ,isLoading } = useContext(AccountContext)


    const [err, setErr] = useState(errorMsg || erMsg)

    const handlePress = async()=>{
      toggleOpenLogout()
      try {
        await signOut()
      } catch (error) {
        setErr(error.message)
      }
    }

    const openImage =async()=>{
      try {
        const uri = await pickImage()
        // userId for auth and other for picture name
        const url = await uploadImage(userId, userId, uri)
        //await updatePic(url)
      } catch (error) {
        console.log(error.message)
        setErr(error.message)
      }
    }

    return(
        
            <>
            <LogoutModal modalVisible={openLogout} handlePress={handlePress}/>
            <View style={styles.container}>

              <View style={styles.pic_details}>
                <View>
                  <TouchableWithoutFeedback onPress={openImage}>
                    <View style={styles.imageContainer}>
                            <Image style={styles.pic} source={{uri:account.profilepic}}/>
                      </View>
                  </TouchableWithoutFeedback>
                  {
                    isLoading ?(
                      <View style={styles.loadingContainer}>
                              <ActivityIndicator size='small' color='#A30D5B'/>
                      </View>
                    ):null
                  }
                </View>
                  <Text style={styles.emailText}>{account.email}</Text>
                  <TextInput style={styles.nameInput} value={account.username}/>
              </View>

              <TouchableWithoutFeedback>
                <View style={styles.button}>
                  <Text style={styles.button_text}>Delete account</Text>
                </View>
              </TouchableWithoutFeedback>
              <StatusBar style="light" backgroundColor='#A30D5B'/>
            </View>
            </>
        
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection:'column',
      alignItems: 'center',
      justifyContent:'space-between'
    },
    pic_details:{
      flexDirection:'column',
      alignItems:'center',
      marginTop:40
    },
    imageContainer:{
      height:.75*width,
      width:.75*width,
      borderRadius:300,
      backgroundColor:'#D9D9D9',
    },
    loadingContainer:{
      height:.75*width,
      width:.75*width,
      borderRadius:300,
      backgroundColor:'#D9D9D9',
      position:'absolute', 
      zIndex:3,
      backgroundColor:'transparent', 
      flexDirection:'column', 
      alignItems:'center', 
      justifyContent:'center'
    },
    pic:{
      height:'100%',
      width:'100%',
      borderRadius:300
    },
    emailText:{
      fontSize:22,
      color:'#000',
      marginTop:20,
      marginBottom:10
    },
    nameInput:{
      width:200,
      height:50,
      borderRadius:10,
      backgroundColor:'#D9D9D9',
      fontSize:24,
      fontWeight:"600",
      textAlign:'center'
    },
    button:{
      backgroundColor:"#fff",
      width:.5*width,
      height:41,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10,
      borderColor:'#A30D5B',
      borderWidth:2,
      borderStyle:'solid',
      marginBottom:35
    },
    button_text:{
      fontSize:17,
      color:'#000'
    },
  });
  