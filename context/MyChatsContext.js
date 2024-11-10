import React, {useState, createContext} from "react";

export const MyChatsContext = createContext()

export const MyChatsProvider =({ children })=>{
    const [chats, setChats] = useState([])

    const [isLoading, setIsLoading] = useState(null)

    const updateChats = (chat)=>{

        setChats(chat)
        setIsLoading(false)
    }

    return (
        <MyChatsContext.Provider value={{chats, isLoading, updateChats }}>
            {children}
        </MyChatsContext.Provider>
    )
}