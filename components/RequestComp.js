import { useState, useContext, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateRequests } from '../services/requestsService'
import { AuthContext } from '../context/AuthContext'
export default RequestComp =({id, name, pic, status, date, senderId})=>{
    
    const { userId } = useContext(AuthContext)
    const handlePress = async(id,status)=>{
        try {
            await updateRequests(id,status,senderId,userId)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
            <View id={id} style={styles.container}>
                <View style={styles.firstView}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri:pic}} style={styles.pic}/>
                    </View>
                        <Text style={styles.name}>{name}</Text>
                </View>

                <Text style={styles.date}>{date}</Text>
                {
                    status ==='accepted' ? (<Text style={{fontSize:13, color:'#1AD166', flex:1}}>accepted</Text>):
                (<View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.statusContainer} onPress={()=>handlePress(id, "accepted")}>
                        <Ionicons name="person-add" size={24} color="#A30D5B" />
                        <Text style={styles.statusText}>accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{...styles.statusContainer, marginLeft:10}} onPress={()=>handlePress(id,"request")}>
                        <MaterialCommunityIcons name="bell-remove" size={24} color="#676262" />                        
                        <Text style={styles.statusText}>ignore</Text>
                    </TouchableOpacity>
                </View>)
                }
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
        flex:1
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
        alignItems:'center',
        flex:1
    },
    date:{
        color:'#000',
        fontSize:14,
        flex:1
    }
})