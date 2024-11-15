import React, { useState, createContext, useEffect, useContext } from "react";
import { db, collection, query, where, onSnapshot, doc } from '../firebase/configs';
import { AuthContext } from './AuthContext';

export const MyChatsContext = createContext()

export const MyChatsProvider =({ children })=>{
    const [chatsInfo, setChatsInfo] = useState([])
    const [userDetails, setUserDetails] = useState([])
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])


    const [isLoading, setIsLoading] = useState(null)
    const { userId } = useContext(AuthContext);


    const updateChats = (chat)=>{

        //setChats(chat)
        //setIsLoading(false)
    }

    const updateArray = (arr1, item) => {
        const index = arr1.findIndex(({ id }) => item.id === id);
        let newArr = [...arr1];

        if (index === -1) {
            newArr.push(item);
        } else {
            newArr[index] = { ...newArr[index], ...item };
        }

        return newArr;
    };

    const mergeItems = (arr1, arr2)=>{
        let newArr = []
        arr1.forEach(item=>{
            const friendUserId = item.users.filter(id=>id !== userId)[0]
            const index = arr2.findIndex(({id})=>friendUserId === id)
            if (index !== -1) {
                newArr.push({...item,...{chatName:arr2[index].username, chatIcon:arr2[index].profilePic}})
            }
        })
       
        return newArr
      }

    useEffect(() => {
        if (!userId) return; // Exit if userId is undefined
        console.log("USER ID ", userId)
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
    
        // Cleanup function to unsubscribe on unmount or userId change
        return () => unsubscribe();
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
                    setUserDetails((prev) => updateArray(prev,  { ...data, id: snap.id }));
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
    },[userDetails])
    
    useEffect(()=>{
        const allUnsubscribers = []
        chatsInfo.forEach(item=>{
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
    },[chatsInfo])

    console.log("CHATS ", chats)


    return (
        <MyChatsContext.Provider value={{chats, isLoading, updateChats }}>
            {children}
        </MyChatsContext.Provider>
    )
}