import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatMessages from "../screens/ChatMessages";
import Account from "../screens/AccountScreen";
import HomeTab from "./HomeTab";
import StackHeader from "../components/StackHeader";

const Stack = createNativeStackNavigator()

export default function HomeStack(){
    return(
        <Stack.Navigator screenOptions={{
            header:props=><StackHeader {...props}/>
            }}>
            <Stack.Screen name="Home tab" component={HomeTab} options={{headerShown:false}}/>
            <Stack.Screen name="Chat messages" component={ChatMessages}/>
            <Stack.Screen name="Account" component={Account}/>
        </Stack.Navigator>
    )
}