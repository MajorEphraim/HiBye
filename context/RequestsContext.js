import React, { useState, createContext, useEffect, useContext } from "react";
import { db, collection, query, where, onSnapshot, doc } from '../firebase/configs';
import { AuthContext } from './AuthContext';

export const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
    const [requestsSent, setRequestSent] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState([]);
    const [sendersAccount, setSendersAccount] = useState([]);
    const [receiversAccount, setReceiversAccount] = useState([]);
    const [requestInfo_s, setRequestInfo_s] = useState([]);
    const [requestInfo_r, setRequestInfo_r] = useState([]);

    const { userId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(null);

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
          const index = arr2.findIndex(({id})=>item.receiverId === id || item.senderId === id)
          if (index !== -1) {
              newArr.push({...item,...arr2[index],...{id:item.id}})
          }
      })

      return newArr
    }

    useEffect(() => {
        const sentQ = query(collection(db, "friend requests"), where("senderId", "==", userId));

        const unsubscribeSent = onSnapshot(sentQ, (snap) => {
            const requests = [];
            snap.forEach((doc) => {
                requests.push({ ...doc.data(), id: doc.id });
            });
            setRequestSent(requests);
        });

        const receivedQ = query(collection(db, "friend requests"), where("receiverId", "==", userId));

        const unsubscribeReceived = onSnapshot(receivedQ, (snap) => {
            const requests = [];
            snap.forEach((doc) => {
                requests.push({ ...doc.data(), id: doc.id });
            });
            setRequestsReceived(requests);
        });

        return () => {
            unsubscribeSent();
            unsubscribeReceived();
        };
    }, [userId]);

    useEffect(() => {
        const unsubscribeFunctions = [];

        requestsSent.forEach((item) => {
            const q = doc(db, "accounts", item.receiverId);

            const unsubscribe = onSnapshot(q, (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    setReceiversAccount((prev) => updateArray(prev,  { ...data, id: snap.id }));
                } else {
                    console.log("No such document!");
                }
            });

            unsubscribeFunctions.push(unsubscribe);
        });

        return () => {
            unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        };
    }, [requestsSent]);

    useEffect(() => {
        const unsubscribeFunctions = [];

        requestsReceived.forEach((item) => {
            const q = doc(db, "accounts", item.senderId);

            const unsubscribe = onSnapshot(q, (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    setSendersAccount((prev) => updateArray(prev, { ...data, id: snap.id }));
                } else {
                    console.log("No such document!");
                }
            });

            unsubscribeFunctions.push(unsubscribe);
        });

        return () => {
            unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        };
    }, [requestsReceived]);

    useEffect(() => {
        setRequestInfo_s(mergeItems(requestsSent, receiversAccount))
        setRequestInfo_r(mergeItems(requestsReceived, sendersAccount))
    }, [requestsSent, requestsReceived, sendersAccount, receiversAccount]);

    
    return (
        <RequestsContext.Provider value={{ requestInfo_r, requestInfo_s }}>
            {children}
        </RequestsContext.Provider>
    );
};
