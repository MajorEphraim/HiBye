import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default RequestComp =({id, name, pic, status, date})=>{
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
            color = "#D9D9D9"

        return color
    }

    return(
            <View id={id} style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={pic} style={styles.pic}/>
                    </View>
                        <Text style={styles.name}>{name}</Text>
                </View>

                <Text style={styles.date}>{date}</Text>

                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.statusContainer} onPress={()=>handlePress(id)}>
                        <Ionicons name="person-add" size={24} color="#A30D5B" />
                        <Text style={styles.statusText}>accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{...styles.statusContainer, marginLeft:10}} onPress={()=>handlePress(id)}>
                        <MaterialCommunityIcons name="bell-remove" size={24} color="#676262" />                        
                        <Text style={styles.statusText}>ignore</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:65,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:5,
    },
    firstView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    imageContainer:{
        height:45,
        width:45,
        borderRadius:100,
        backgroundColor:'#A30D5B',
        marginRight:10
    },
    pic:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
    name:{
        fontSize:18,
        color:'#000'
    },
    statusContainer:{
        flexDirection:'column',
        alignItems:'center',
    },
    statusText:{
        fontSize:12
    },
    iconsContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    date:{
        color:'#000',
        fontSize:14
    }
})