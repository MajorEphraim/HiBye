import React, {useContext} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewChats from "../screens/NewChats";
import MyChats from "../screens/ChatsScreen";
import TabHeader from "../components/TabHeader";
import Ionicons from '@expo/vector-icons/Ionicons';
import {MyChatsContext } from '../context/MyChatsContext' 
import { AuthContext } from '../context/AuthContext' 


const Tab = createBottomTabNavigator()

export default function HomeTab(){
    const { userId } = useContext(AuthContext)
    const { chats } = useContext(MyChatsContext)
    const count = chats.filter(item=>item.unread && item.lastSender !== userId).length
    return(
        <Tab.Navigator screenOptions={({route})=>({

            header:props=><TabHeader {...props}/>,
            tabBarIcon:({focused, color, size})=>{
                let iconName;
                
                if(route.name === "My chats"){
                    iconName = 'chatbubble'
                }else if(route.name === 'New chats'){
                    iconName = 'people'
                }
                
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarLabel: route.name === 'My chats' ? 'My chats' : 'New chats',
            tabBarLabelStyle: {
                fontWeight: 'bold',        
                fontSize: 13,               
              },
            tabBarStyle:{backgroundColor:'#A30D5B', height: 52, },
            tabBarActiveTintColor:'#fff',
            tabBarInactiveTintColor:'#E663A7'
        })}>
            <Tab.Screen 
                name="My chats" 
                component={MyChats}
                options={ count ===0 ? null : {
                    tabBarBadge:count, 
                    tabBarBadgeStyle: {
                      backgroundColor: "red", // Set the badge background color
                      color: "white", // Set the badge text color
                      fontSize: 10, // Adjust font size for the badge
                      fontWeight: "bold", // Make the badge text bold
                      minWidth: 16, // Ensure the badge is circular for small numbers
                      height: 16,
                      borderRadius: 8, // Round the badge for a circle shape
                      textAlign: "center", // Center the text
                    },
                  }}
            />
            <Tab.Screen name="New chats" component={NewChats}/>
        </Tab.Navigator>
    )
}