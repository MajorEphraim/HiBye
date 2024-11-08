import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import NewChats from "../screens/NewChats";
import MyChats from "../screens/ChatsScreen";
import TabHeader from "../components/TabHeader";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export default function HomeTab(){
    return(
        <Tab.Navigator screenOptions={({route})=>({

            header:props=><TabHeader {...props}/>,
            tabBarIcon:({focused, color, size})=>{
                let iconName;
                
                if(route.name === "My chats"){
                    iconName = focused ? 'chatbubble':'chatbubble-outline'
                }else if(route.name === 'New chats'){
                    iconName = focused ? 'people':'people-outline'
                }
                
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarLabel: route.name === 'My chats' ? 'My chats' : 'New chats',
            tabBarLabelStyle: {
                fontWeight: 'bold',         // Makes text bold
                fontSize: 13,               // Adjusts font size if needed
              },
            tabBarStyle:{backgroundColor:'#A30D5B', height: 52, },
            tabBarActiveTintColor:'#fff',
            tabBarInactiveTintColor:'#E663A7'
        })}>
            <Tab.Screen name="My chats" component={MyChats}/>
            <Tab.Screen name="New chats" component={NewChats}/>
        </Tab.Navigator>
    )
}