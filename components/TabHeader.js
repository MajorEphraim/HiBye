import { useContext } from "react";
import { View, StyleSheet, Image, Text,
    TouchableWithoutFeedback, Dimensions, 
    StatusBar, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { HeaderContext } from '../context/HeaderContext'
import { AccountContext } from '../context/AccountContext'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default TabHeader = ()=>{
    const navigation = useNavigation()
    const route = useRoute()
    const { toggleOpenRequest } = useContext(HeaderContext)
    const { account } = useContext(AccountContext)


    return(
        <View style={styles.container}>
            <View style={styles.image_name}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("Account")}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.pic} source={ account.profilePic ? {uri:account.profilePic}:null}/>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.name}>HiBye</Text>
            </View>
            <TouchableWithoutFeedback onPress={()=>toggleOpenRequest()}>
                <View>
                    <Ionicons name="person" size={24} color="#fff" />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:.08*height,
        backgroundColor:'#A30D5B',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        marginTop:StatusBar.currentHeight
    },
    imageContainer:{
        height:.049*height,
        width:.049*height,
        backgroundColor:'#fff',
        borderRadius:100,
    }, 
    image_name:{
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        fontSize:.085*width,
        color:'#fff',
        marginLeft:15
    },
    friendRequest:{
        height:.035*height,
        width:.035*height,
        backgroundColor:'#fff',
        borderRadius:100,
    },
    pic:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
})