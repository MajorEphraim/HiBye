import React, {useState, createContext, useContext} from "react";
import { Alert } from 'react-native'
import { signInUser, getUserId, signOutUser } from '../services/authService'
import { auth } from '../firebase/configs'
import { removeUser } from '../services/authService'
import { deleteAccount } from '../services/accountService'
import { deleteImage } from '../services/mediaService'

export const AuthContext = createContext()

export const AuthProvider =({ children })=>{
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const signIn = async(email, password)=>{
        try {
            setErrorMsg(null)
            setIsLoading(true)
            const response = await signInUser(email, password)
            if(response.error)
                setErrorMsg(response.message)
            else{
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

    
    const removeAccount = async(image)=>{

        const user = auth.currentUser;

        if (!user) {
            setErrorMsg("No user is signed in");
            
  
                Alert.alert(
                "Sign Out",
                "Your has expired! Sign out first for this action.",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                    text: "Okay",
                    style: "destructive",
                        onPress: async () => {
                            await signOut();
                        },
                    },
                ]
                );
            
            return;
        }

        try {
            setIsLoading(true)
            const output = await deleteImage(user.uid, user.uid)
            if(image && output.error){
                setErrorMsg(output.message)
                return
            }
            console.log("HEREREREREREE")

            await deleteAccount(user.uid)
            await removeUser(user)
            setIsLoading(false)
        
            setIsLoading(false)
            
        } catch (error) {
            setErrorMsg(error.message)
        }
    }


    console.log("ERRRRR out: ", errorMsg)

    return (
        <AuthContext.Provider value={{userId, isLoading, errorMsg, signIn, useLocalUserId, signOut, removeAccount}}>
            {children}
        </AuthContext.Provider>
    )

}