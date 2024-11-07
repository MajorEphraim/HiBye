import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import NewChats from "../screens/NewChats";

const Tab = createBottomTabNavigator()

export default function HomeTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home stack" component={HomeStack}/>
            <Tab.Screen name="New chats" component={NewChats}/>
        </Tab.Navigator>
    )
}