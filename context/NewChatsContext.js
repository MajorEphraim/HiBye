import React, {useState, createContext} from "react";

export const NewChatsContext = createContext()

export const NewChatsProvider =({ children })=>{
    const [chats, setChats] = useState([])

    const [isLoading, setIsLoading] = useState(null)

    const updateChats = (chat)=>{

        setChats(chat)
        setIsLoading(false)
    }

    return (
        <NewChatsContext.Provider value={{chats, isLoading, updateChats }}>
            {children}
        </NewChatsContext.Provider>
    )
}