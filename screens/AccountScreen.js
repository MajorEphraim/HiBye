import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, 
        Dimensions, TouchableWithoutFeedback } from 'react-native';
import thulani from '../assets/pictures/thulani.jpg'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AccountScreen = ()=>{
    return(
        
            <View style={styles.container}>
              <View style={styles.pic_details}>
                 <View style={styles.imageContainer}>
                        <Image style={styles.pic} source={thulani}/>
                  </View>
                  <Text style={styles.emailText}>thulani@gmail.com</Text>
                  <TextInput style={styles.nameInput} value='Thulani'/>
              </View>

              <TouchableWithoutFeedback>
                <View style={styles.button}>
                  <Text style={styles.button_text}>Delete account</Text>
                </View>
              </TouchableWithoutFeedback>
              <StatusBar style="light" backgroundColor='#A30D5B'/>
            </View>
        
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
      borderRadius:300
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
  