import React,{ useContext } from "react";
import { View, StyleSheet, Image, Text,
    TouchableWithoutFeedback, Dimensions, Platform, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HeaderContext } from "../context/HeaderContext";
import { ChatHeaderContext } from "../context/ChatHeaderContext";


import pikachu from '../assets/pictures/pikachu.jpeg'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default StackHeader = ()=>{
    const navigation = useNavigation()
    const route = useRoute()
    const { toggleOpenOptions, toggleOpenLogout } = useContext(HeaderContext)
    const { headerInfo } = useContext(ChatHeaderContext)

    return(
        <View style={styles.container}>
            <View style={styles.upperView}>
                <View style={styles.image_name}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.routeName}>{route.name === "Account" ? "Account" : headerInfo.chatName}</Text>
            </View>


            {
                route.name === "Account" ? (
                    <TouchableWithoutFeedback onPress={()=>toggleOpenLogout()}>
                        <AntDesign name="logout" size={24} color="#fff" />
                    </TouchableWithoutFeedback>

                ):(
                    <View style={styles.lowerContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri:headerInfo.chatIcon}} style={styles.pic}/>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>toggleOpenOptions()}>
                            <Entypo name="dots-three-horizontal" size={24} color="#fff" />
                        </TouchableWithoutFeedback>
                    </View>
                )
            }
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
        marginTop:StatusBar.currentHeight,
        paddingHorizontal:15
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
    upperView:{
        flexDirection:'row',
        alignItems:'center'
    },
    routeName:{
        color:'#fff',
        fontSize:20,
        marginLeft:15
    },
    imageContainer:{
        height:50,
        width:50,
        borderRadius:100,
        backgroundColor:'#fff',
        marginRight:15
    },
    pic:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
    lowerContainer:{
        flexDirection:'row',
        alignItems:"center",
    }
})