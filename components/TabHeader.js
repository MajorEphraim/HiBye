import { View, StyleSheet, Image, Text,
    TouchableWithoutFeedback, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default TabHeader = ()=>{
    const navigation = useNavigation()
    
    return(
        <View style={styles.container}>
            <View style={styles.image_name}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("Account")}>
                    <View style={styles.imageContainer}>

                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.name}>HiBye</Text>
            </View>
            <TouchableWithoutFeedback>
                <View>
                    <Feather name="search" size={26} color="#fff" />
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
        height:.045*height,
        width:.045*height,
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
        marginLeft:20
    },
    friendRequest:{
        height:.035*height,
        width:.035*height,
        backgroundColor:'#fff',
        borderRadius:100,
    }
})