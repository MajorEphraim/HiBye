import React, {useState, createContext} from "react";

export const AuthContext = createContext()

export const AuthProvider =({ children })=>{
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signIn = (token)=>{

        setUserToken(token)
        setIsLoading(false)
    }

    const signOut = ()=>{
        setUserToken(null)
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={{userToken, isLoading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}