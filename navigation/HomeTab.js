import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import NewChats from "../screens/NewChats";
import MyChats from "../screens/MyChats";
import TabHeader from "../components/TabHeader";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
const Tab = createBottomTabNavigator()

export default function HomeTab(){
    const route = useRoute()
    return(
        <Tab.Navigator screenOptions={{
            header:props=><TabHeader {...props}/>,
            tabBarIcon:({focused, color, size})=>{
                let iconName;

                if(route.name === "My chats"){
                    iconName = focused ? 'chatbubble':'chatbubble-outline'
                }else if(route.name === 'New chats'){
                    iconName = focused ? 'icon3':'icon4'
                }

                return <Ionicons name="chatbubble-ellipses" size={24} color="black" />
            }

            
            }}>
            <Tab.Screen name="My chats" component={MyChats}/>
            <Tab.Screen name="New chats" component={NewChats}/>
        </Tab.Navigator>
    )
}