import { auth, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut } 
from '../firebase/configs'
import * as SecureStore from 'expo-secure-store';
import { fetchAccountDetails } from './accountService'

const url = "https://api-h4c7yaksja-uc.a.run.app/accounts"

const signUpUser = async(username,email,password)=>{

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        const resp = await fetch(url+"/"+user.uid, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
            }),
        });

        // Check if the response status is OK (2xx range)
        if (!resp.ok) {
            throw new Error(`Failed to update account: ${resp.statusText}`);
        }

        // Parse the JSON response
        const data = await resp.json();

        // Handle the successful response
        console.log('User updated successfully', data);
        return data;
    } catch (error) {
        console.log(error)
        return {error:true, message:"Something went wrong: "+error.message}
    }
}

const signInUser = async(email,password)=>{

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
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