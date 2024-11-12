import React, {useState, createContext} from "react";
import { signInUser, getUserId, signOutUser } from '../services/authService'
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext()

export const AuthProvider =({ children })=>{
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const signIn = async(email, password)=>{
        try {
            setIsLoading(true)
            const response = await signInUser(email, password)
            
            if(response.error)
                setErrorMsg(response.message)
            else{
                await SecureStore.setItemAsync('userId', response.uid);
                setUserId(response.uid)
            }

            setIsLoading(false)

        } catch (error) {
            setErrorMsg("Something went wrong: ", error.message)
            setIsLoading(false)
        }
    }

    const useLocalUserId = async () => {
        try {
          setIsLoading(true);
          const userId = await getUserId();
          if (userId) {
            setUserId(userId);
          } 
        } catch (error) {
          setErrorMsg(error.message);
        } finally {
          setIsLoading(false);
        }
      };

    const signOut = async()=>{
        try {
            setIsLoading(true)
            const resp = await signOutUser()

            if(resp.error){
                setErrorMsg(resp.message)
            }else{
                setUserId(null)
            }
            setIsLoading(false)
            
        } catch (error) {
            setErrorMsg(resp.message)
        }
    }


    return (
        <AuthContext.Provider value={{userId, isLoading, errorMsg, signIn, useLocalUserId, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}