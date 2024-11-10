import React, {useState, createContext} from "react";

export const MessagesContext = createContext()

export const MessagesProvider =({ children })=>{
    const [messages, setMessages] = useState([])

    const [isLoading, setIsLoading] = useState(null)

    const updateMessages = (chat)=>{

        setMessages(chat)
        setIsLoading(false)
    }

    return (
        <MessagesContext.Provider value={{messages, isLoading, updateMessages }}>
            {children}
        </MessagesContext.Provider>
    )
}