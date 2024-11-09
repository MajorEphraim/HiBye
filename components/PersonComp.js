import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default PersonComp =({id, name, handlePress, pic, status})=>{
    return(
            <View id={id} style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={pic} style={styles.pic}/>
                    </View>
                        <Text style={styles.name}>{name}</Text>
                </View>


                <TouchableOpacity style={styles.statusContainer} onPress={()=>handlePress(id)}>
                    <FontAwesome6 name="circle-plus" size={24} color="#A30D5B" />
                    <Text>{status}</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:65,
        width:'100%',
        flexDirection:'row',
        marginBottom:5
    },
    firstView:{
        flexDirection:'row',
        alignItems:'center',
        flex:9,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        overflow:'hidden',
    },
    imageContainer:{
        height:50,
        width:50,
        borderRadius:100,
        backgroundColor:'#A30D5B',
        marginRight:15
    },
    pic:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
    name:{
        fontSize:22
    },
    statusContainer:{
        flexDirection:'column',
        alignItems:'center',
        flex:2
    }
})