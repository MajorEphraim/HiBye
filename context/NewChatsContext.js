import React, {useState, createContext, useContext} from "react";
import { fetchPeople } from '../services/chatsService'
import { AuthContext } from './AuthContext'

export const NewChatsContext = createContext()

export const NewChatsProvider =({ children })=>{
    const [people, setPeople] = useState([])

    const [isLoading, setIsLoading] = useState(null)
    const [errorM, setErrorM] = useState(null)

    const { userId } = useContext(AuthContext)


    const updatePeople = async()=>{
        try {
            setIsLoading(true)
            const newPeople = await fetchPeople()
            setPeople(newPeople.filter(item=>item.id !== userId))
        } catch (error) {
            setErrorM(error.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <NewChatsContext.Provider value={{people, isLoading, errorM, updatePeople }}>
            {children}
        </NewChatsContext.Provider>
    )
}