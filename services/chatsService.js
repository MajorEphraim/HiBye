import { db,collection, addDoc, updateDoc, doc, increment } from '../firebase/configs'


const updateChat = async(obj, chatId)=>{

  const ref = doc(db, "chats", chatId);
  try {
    await updateDoc(ref, obj);
  } catch (error) {
    throw new Error(error.message);
  }
}

const sendMessage = async(chatId, message, userId)=>{
    try {

        const date = new Date()
        let hours = date.getHours()
        let mins = date.getMinutes()

        const timeSent = (hours <10 ? "0"+hours : hours )+":"+(mins <10 ? "0"+mins : mins)
        const timestamp = Date.now()
        
        await addDoc(collection(db, "messages"), {
            chatId,
            senderId:userId,
            message,
            timeSent,
            timestamp,
            unread:true,
        });

        await updateChat({
          lastMessage:message,
          lastSender:userId,
          timeSent:timestamp,
          unread:true,
          count:increment(1),
        },chatId)
  
        return {error:false}
    } catch (error) {
      console.log("EEE: ", error.message)
        return {error:true, message:"Oops! failed to send the message"}
    }
}

function timeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time; // Difference in milliseconds
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSec < 60) {
      return "now"; // Less than 1 minute ago
    } else if (diffInMin < 60) {
      return `${diffInMin} min${diffInMin > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return "yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 14) {
      return "last week";
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
  }

  const updateArray = (arr1, arr2) => {

    let newArr = [...arr1];

    arr2.forEach(item=>{
        const index = arr1.findIndex(({ id }) => item.id === id);
        
        if (index === -1) {
            newArr.push(item);
        } else {
            newArr[index] = { ...newArr[index], ...item };
        }
    })

    return newArr;
};
  

export {sendMessage,timeAgo, updateArray, updateChat}