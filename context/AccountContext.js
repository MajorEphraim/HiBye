import React, {useState, createContext, useContext} from "react";
import { AuthContext } from './AuthContext'
import { fetchAccountDetails, updateAccountDetails } from '../services/accountService'

export const AccountContext = createContext()

export const AccountProvider =({ children })=>{
    const { userId } = useContext(AuthContext)

    const [account, setAccount] = useState({
        username:'Your name',
        email:'',
        profilePic:null
    })

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const updateName = async(username)=>{
        setIsLoading(true)

        try {
            await updateAccountDetails({username})
            setAccount(prevState=>({...prevState,username}))
            setIsLoading(false)
        } catch (error) {
            setErrorMsg(error.message) 
            setIsLoading(false)
        }
    }

    const updatePic = async(profilePic)=>{

        setIsLoading(true)

        try {
            await updateAccountDetails({image:profilePic})
            setAccount(prevState=>({...prevState,profilePic}))
            setIsLoading(false)
        } catch (error) {
            
        }
    }

    const updateAccount = async()=>{
        setIsLoading(true)
        try {
            
        const data = await fetchAccountDetails(userId)
        setAccount(data)
        setIsLoading(false)

        } catch (error) {
            setErrorMsg(error.message) 
            setIsLoading(false)
        }
    }

    return (
        <AccountContext.Provider value={{account, isLoading,errorMsg, updateName, updatePic, updateAccount}}>
            {children}
        </AccountContext.Provider>
    )
}