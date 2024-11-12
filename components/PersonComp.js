import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default PersonComp =({id, name, handlePress, pic, status})=>{
    const currentIcon = ()=>{

        let iconName
        if(status === "request")
            iconName = "circle-plus"
        else if(status === "accepted")
            iconName = "handshake-simple"
        else
            iconName = "paper-plane"

        return iconName
    }

    const currentColor = ()=>{

        let color
        if(status === "request")
            color = "#A30D5B"
        else if(status === "accepted")
            color = "#1AD166"
        else
            color = "#676262"

        return color
    }

    return(
            <View id={id} style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri:pic}} style={styles.pic}/>
                    </View>
                        <Text style={styles.name}>{name}</Text>
                </View>


                <TouchableOpacity style={styles.statusContainer} onPress={()=>handlePress(id)}>
                    <FontAwesome6 name={currentIcon()} size={20} color={currentColor()} />
                    <Text style={styles.statusText}>{status}</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:65,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
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
        fontSize:19,
        color:'#000'
    },
    statusContainer:{
        flexDirection:'column',
        alignItems:'center',
        flex:2
    },
    statusText:{
        fontSize:12
    }
})