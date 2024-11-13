import React, {useState, createContext, useEffect} from "react";
import { db, collection, query, where, onSnapshot, doc } from '../firebase/configs'

export const RequestsContext = createContext()

export const RequestsProvider =({ children })=>{
    const [requestsDetails, setRequestsDetails] = useState([])
    const [accountDetails, setAccountDetails] = useState([])
    const [requests, setRequests] = useState([])


    const [isLoading, setIsLoading] = useState(null)

    const mergeArrays = (arr1, arr2) => {
 
          arr2.forEach(item=>{
            const index = arr1.findIndex(({ id }) => id === item.id);
            
            if (index === -1) {
              arr1.push(item);
            } else {
              arr1[index] = item;
            }
          })

      return arr1;
  };

    const mergeItems = (arr1, arr2)=>{
      
      const arr3 = []
      
      arr1.forEach(item=>{
        const index = arr2.findIndex(({id})=>item.senderId === id || item.receiverId == id)
        arr3.push({...item,...arr2[index]})
      })
    
      return arr3
    }
  
    const listenToRequestAndAccounts = (userId) => {
        try {
          const sentRQuery = query(
            collection(db, 'friend requests'),
            where('senderId', '==', userId)
          );
      
          onSnapshot(sentRQuery, (snap) => {
            let sentRequests = [];
            snap.forEach((doc) => {
              sentRequests.push({ ...doc.data(), id: doc.id });
              listenToAccounts(doc.data().receiverId); // Call listenToAccounts with receiverId
            });
      
            setRequestsDetails(prev=>mergeArrays(prev,sentRequests));
          });

          const receivedRQuery = query(
            collection(db, 'friend requests'),
            where('receiverId', '==', userId)
          );
      
          onSnapshot(receivedRQuery, (snap) => {
            let receivedRequests = [];
            snap.forEach((doc) => {
              receivedRequests.push({ ...doc.data(), id: doc.id });
              listenToAccounts(doc.data().senderId); // Call listenToAccounts with senderId
            });
      
            setRequestsDetails(prev=> mergeArrays(prev,receivedRequests)); 
          });
        } catch (error) {
          console.error("Something went wrong:", error.message);
        }
      };
      
      const listenToAccounts = (personId) => {
        try {
          const accountDocRef = doc(db, 'accounts', personId); 
      
          onSnapshot(accountDocRef, (docSnap) => {

            if (docSnap.exists()) {
              setAccountDetails(prev=>mergeArrays(prev,[{...docSnap.data(),id:docSnap.id}]))
            } else {
              console.log("Account not found:", personId);
            }
          });
        } catch (error) {
          console.error("Something went wrong:", error.message);
        }
      };


      useEffect(()=>{
        
        setRequests(mergeItems(requestsDetails, accountDetails))
      },[accountDetails,requestsDetails])

    


    return (
        <RequestsContext.Provider value={{requests, isLoading,listenToRequestAndAccounts }}>
            {children}
        </RequestsContext.Provider>
    )
}