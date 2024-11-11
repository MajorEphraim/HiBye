import { auth, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut, db, doc, setDoc } 
from '../firebase/configs'
import * as SecureStore from 'expo-secure-store';

const signUpUser = async(username,email,password)=>{

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await setDoc(doc(db,"accounts", user.uid),{
            username,
            email,
            profilePic:null
        })
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