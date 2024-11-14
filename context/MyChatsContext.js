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

        //setChats(chat)
        //setIsLoading(false)
    }

    useEffect(() => {
        if (!userId) return; // Exit if userId is undefined
        
        // Define the query to find documents where "users" array contains "userId"
        const q = query(collection(db, "chats"), where("users", "array-contains", userId));
    
        // Set up the onSnapshot listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chats = [];
            snapshot.forEach((doc) => {
                chats.push({ ...doc.data(), id: doc.id });
            });
            
            setChats(chats); // Update state with the chats found
        }, (error) => {
            console.error("Error fetching chats:", error); // Log any errors
        });
    
        // Cleanup function to unsubscribe on unmount or userId change
        return () => unsubscribe();
    }, [userId]);
    

    useEffect(()=>{
        const allUnsubscribers = []
        chats.forEach(item=>{
            const q = query(collection(db, "messages"), where("chatId", '==', item.id))
            
            const unsubscribe = onSnapshot(q, (snap) => {
                const msgs = [];
                snap.forEach((doc) => {
                    msgs.push({ ...doc.data(), id: doc.id });
                });
                setMessages(msgs);
            });
            allUnsubscribers.push(unsubscribe)
        })

            return ()=> {
                allUnsubscribers.forEach(unsubscribe=>unsubscribe())
            }
    },[chats])


    return (
        <MyChatsContext.Provider value={{chats, isLoading, updateChats }}>
            {children}
        </MyChatsContext.Provider>
    )
}