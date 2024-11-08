import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyChats from "../screens/MyChats";
import ChatMessages from "../screens/ChatMessages";
import Account from "../screens/Account";
import HomeTab from "./HomeTab";

const Stack = createNativeStackNavigator()

export default function HomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home tan" component={HomeTab}/>
            <Stack.Screen name="Chat messages" component={ChatMessages}/>
            <Stack.Screen name="Account" component={Account}/>
        </Stack.Navigator>
    )
}