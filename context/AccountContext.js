import React, {useState, createContext} from "react";

export const AccountContext = createContext()

export const AccountProvider =({ children })=>{
    const [account, setAccount] = useState({
        username:'Your name',
        email:'',
        profilePic:null
    })

    const [isLoading, setIsLoading] = useState(null)

    const updateName = (username)=>{

        setAccount(prevState=>({...prevState,username}))
        setIsLoading(false)
    }

    const updatePic = (profilePic)=>{

        setAccount(prevState=>({...prevState,profilePic}))
        setIsLoading(false)
    }

    return (
        <AccountContext.Provider value={{account, isLoading, updateName, updatePic}}>
            {children}
        </AccountContext.Provider>
    )
}