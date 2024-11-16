import React, {useState, createContext, useContext, useEffect} from "react";
import { fetchPeople } from '../services/requestsService'
import { AuthContext } from './AuthContext'
import { RequestsContext } from './RequestsContext'

export const NewChatsContext = createContext()

export const NewChatsProvider =({ children })=>{
    const [people, setPeople] = useState([])
    const [peopleDetails, setPeopleDetails] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [errorM, setErrorM] = useState(null)

    const { userId } = useContext(AuthContext)
    const { requestInfo_s, requestInfo_r } = useContext(RequestsContext)


      
  const mergeItems = (arr1, arr2)=>{
    const arr3 = []
    arr1.forEach(item=>{
      const index = arr2.findIndex(({receiverId})=>item.id == receiverId) // look for match
      if (index == -1) {
        arr3.push(item)
      }else{
        arr3.push({...item,...arr2[index],id:item.id})
      }
    })

    const sendersIds = requestInfo_r.map(item => item.senderId);
    const sendersStatuses = requestInfo_r.map(item => item.status);

    const finalArr = arr3.filter(({ id }) => {
        const senderIndex = sendersIds.indexOf(id);
        return senderIndex === -1 || sendersStatuses[senderIndex] === "request";
    });
    return finalArr
  }

    const updatePeople = async()=>{
        try {
            setIsLoading(true)
            const newPeople = await fetchPeople()
            setPeopleDetails(newPeople.filter(item=>item.id !== userId))

        } catch (error) {
            setErrorM(error.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    
    useEffect(()=>{
        updatePeople()
    },[userId])

    useEffect(()=>{
        setPeople(mergeItems(peopleDetails, requestInfo_s))
    },[requestInfo_s, peopleDetails])
    
    return (
        <NewChatsContext.Provider value={{people, isLoading, errorM, updatePeople }}>
            {children}
        </NewChatsContext.Provider>
    )
}