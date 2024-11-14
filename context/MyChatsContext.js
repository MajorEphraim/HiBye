import React, { useState, createContext, useEffect, useContext } from "react";
import { db, collection, query, where, onSnapshot, doc } from '../firebase/configs';
import { AuthContext } from './AuthContext';

export const MyChatsContext = createContext()

export const MyChatsProvider =({ children })=>{
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])


    const [isLoading, setIsLoading] = useState(null)
    const { userId } = useContext(AuthContext);


    const updateChats = (chat)=>{

        setChats(chat)
        setIsLoading(false)
    }

    useEffect(()=>{
        const q = query(collection(db, "chats"), where("users", 'array-contains', userId))
          
            const unsubscribe = onSnapshot(q, (snap) => {
                const chats = [];
                snap.forEach((doc) => {
                    chats.push({ ...doc.data(), id: doc.id });
                });
                setChats(chats);
            });


            return unsubscribe()
    },[])


    useEffect(()=>{
        const allUnsubscribers = []
        chats.forEach(item=>{
            const q = query(collection(db, "messages"), where("users", 'array-contains', userId))
            
            const unsubscribe = onSnapshot(q, (snap) => {
                const chats = [];
                snap.forEach((doc) => {
                    chats.push({ ...doc.data(), id: doc.id });
                });
                setChats(chats);
            });
            allUnsubscribers.push(unsubscribe)
        })

            return ()=> {
                allUnsubscribers.forEach(unsubscribe=>unsubscribe())
            }
    },[])



    return (
        <MyChatsContext.Provider value={{chats, isLoading, updateChats }}>
            {children}
        </MyChatsContext.Provider>
    )
}