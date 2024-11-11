import { auth, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut, db, doc, setDoc } 
from '../firebase/configs'
import * as SecureStore from 'expo-secure-store';

const url = "https://console.firebase.google.com/project/hibye-3bb78/overview"

const signUpUser = async(username,email,password)=>{

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await setDoc(doc(db,"accounts", user.uid),{
            username,
            email,
            profilePic:null
        })

        const resp = await fetch(url+"/"+user,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username,
                email,
                profilePic:null
            })
        })
        const data = await resp.json()

        console.log("DATA :",data)
        return user
    } catch (error) {
        return {error:true, message:"Something went wrong: "+error.message}
    }
}

const signInUser = async(email,password)=>{

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await SecureStore.setItemAsync('userId', user.uid);
        return user
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

const signOutUser = async()=>{

    try {
        await signOut(auth)
        await SecureStore.deleteItemAsync('userId');
        return {error:false}
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

const getUserId = async()=>{
    try {
        const userId = await SecureStore.getItemAsync('userId')
        if(userId)
            return userId
        else
            return null
    } catch (error) {
        return null
    }
}

export { signUpUser, signInUser, getUserId, signOutUser }