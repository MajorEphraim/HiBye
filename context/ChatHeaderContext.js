import React, {useState, createContext} from "react";

export const ChatHeaderContext = createContext()

export const ChatHeaderProvider =({ children })=>{

    const [headerInfo, setHeaderInfo] = useState({
        chatName:'',
        chatIcon:null
    })

    const updateHeaderInfo = async(info)=>{
        setHeaderInfo(info)
    }

    return (
        <ChatHeaderContext.Provider value={{headerInfo, updateHeaderInfo}}>
            {children}
        </ChatHeaderContext.Provider>
    )
}