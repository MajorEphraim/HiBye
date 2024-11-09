import { View, StyleSheet, Image, Text,
    TouchableWithoutFeedback, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default StackHeader = ()=>{
    const navigation = useNavigation()
    const route = useRoute()

    return(
        <View style={styles.container}>
            <View style={styles.upperView}>
                <View style={styles.image_name}>
                    <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.routeName}>{route.name === "Account" ? "Account" : "Message"}</Text>
            </View>


            {
                route.name === "Account" ? (
                    <TouchableWithoutFeedback>
                        <AntDesign name="logout" size={24} color="#fff" />
                    </TouchableWithoutFeedback>

                ):(
                    <TouchableWithoutFeedback>
                        <Entypo name="dots-three-horizontal" size={24} color="#fff" />
                    </TouchableWithoutFeedback>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:.1*height,
        backgroundColor:'#A30D5B',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:20,
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
    }
})