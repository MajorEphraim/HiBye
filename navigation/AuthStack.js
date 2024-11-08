import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createNativeStackNavigator()

export default function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Forgot password" component={ForgotPassword} />
        </Stack.Navigator>
    )
}