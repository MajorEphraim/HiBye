import { db,collection,query, where, onSnapshot, getDocs } from '../firebase/configs'
const fetchUrl = 'https://fetchaccounts-h4c7yaksja-uc.a.run.app/accounts'
const apiUrl = "https://api-h4c7yaksja-uc.a.run.app/friend-requests"

let currOffset = 0;

const fetchPeople = async()=>{

    try {
        const resp = await fetch(fetchUrl+"offset?="+currOffset)
        if(!resp.ok)
            throw new Error("HTTP error!: "+resp.error);
    
        const { accounts, nextOffset } = await resp.json()
        currOffset = nextOffset

        return accounts
            
    } catch (error) {
        throw new Error("Something went wrong while fetching people");
        
    }
}

const sendRequests = async(userId, personId)=>{
    try {
        const resp = await fetch(apiUrl+"/"+userId,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({personId})
        })

        if(!resp.ok){
            throw new Error(resp.error);
            
        }

        
    } catch (error) {
        throw new Error(error.message);
        
    } 
}

const updateRequests = async(requestId, status)=>{
    try {
        const resp = await fetch(apiUrl+"/"+requestId,{
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({status})
        })

        if(!resp.ok){
            throw new Error(resp.error);
            
        }

        
    } catch (error) {
        throw new Error(error.message);
        
    } 
}

export { fetchPeople, sendRequests, updateRequests }




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
