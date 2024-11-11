import React, {useState, createContext} from "react";
import { signInUser } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider =({ children })=>{
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)


    const signIn = async(email, password)=>{
        try {
            setIsLoading(true)
            const response = await signInUser(email, password)
            setIsLoading(true)

            if(response.error)
                setErrorMsg(response.message)
            else
                //setUserToken(response)
                console.log("Responce ",response)
        } catch (error) {
            setErrorMsg("Something went wrong: ", error)
        }
        setUserToken(token)
        setIsLoading(false)
    }

    const signOut = ()=>{
        setUserToken(null)
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{userToken, isLoading, errorMsg, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}