import { View, StyleSheet, Image, Text,
    TouchableWithoutFeedback, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import thulani from '../assets/pictures/thulani.jpg'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default TabHeader = ()=>{
    const navigation = useNavigation()
    const route = useRoute()

    return(
        <View style={styles.container}>
            <View style={styles.image_name}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("Account")}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.pic} source={thulani}/>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.name}>HiBye</Text>
            </View>
            <TouchableWithoutFeedback>
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
})