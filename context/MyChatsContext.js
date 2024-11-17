import React, { useState, createContext, useEffect, useContext } from "react";
import { db, collection, query, where, onSnapshot, doc } from '../firebase/configs';
import { AuthContext } from './AuthContext';
import { updateArray } from '../services/chatsService'

export const MyChatsContext = createContext()

export const MyChatsProvider =({ children })=>{
    const [chatsInfo, setChatsInfo] = useState([])
    const [userDetails, setUserDetails] = useState([])
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])


    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useContext(AuthContext);


    const clearChatsStates = ()=>{
        setChatsInfo([])
        setUserDetails([])
        setMessages([])
        setChats([])
    }

    const updateMessages = (msgs)=>{
        setMessages(prev=>updateArray(prev,msgs))
    }

    const mergeItems = (arr1, arr2)=>{
        let newArr = []
        arr1.forEach(item=>{
            const friendUserId = item.users.filter(id=>id !== userId)[0]
            const index = arr2.findIndex(({id})=>friendUserId === id)
            if (index !== -1) {
                newArr.push({...item,...{chatName:arr2[index].username, chatIcon:arr2[index].profilePic, friendId:arr2[index].id}})
            }
        })
       
        return newArr
      }

    useEffect(() => {
        if (!userId) return; // Exit if userId is undefined
        const q = query(collection(db, "chats"), where("users", "array-contains", userId));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatsInfo = [];
            snapshot.forEach((doc) => {
                chatsInfo.push({ ...doc.data(), id: doc.id });
            });
            
            setChatsInfo(chatsInfo); // Update state with the chats found
        }, (error) => {
            console.error("Error fetching chats:", error); // Log any errors
        });
    
        return () => unsubscribe;
    }, [userId]);


    useEffect(()=>{
        const unsubscribeFunctions = [];

        chatsInfo.forEach((item) => {
            const users = item.users
            const friendUserId = users.filter(id=>id !== userId)[0]
            const q = doc(db, "accounts", friendUserId);
            
            const unsubscribe = onSnapshot(q, (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    setUserDetails((prev) => updateArray(prev,  [{ ...data, id: snap.id }]));
                } else {
                    console.log("No such document!");
                }
            });

            unsubscribeFunctions.push(unsubscribe);
        });

        return () => {
            unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        };
    },[chatsInfo])

    useEffect(()=>{
      setChats(mergeItems(chatsInfo,userDetails))
      if(chatsInfo.length === userDetails.length)
            setIsLoading(false);
    },[userDetails])
    console.log("IS LOADING::", isLoading)
    return (
        <MyChatsContext.Provider value={{chats, isLoading, messages, updateMessages, clearChatsStates }}>
            {children}
        </MyChatsContext.Provider>
    )
}