import { auth, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut, deleteUser, 
         } 
from '../firebase/configs'
import { getItem, removeItem, setItem } from '../services/localStorageService'

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
        return data;
    } catch (error) {
        return {error:true, message:"Error: "+error.message}
    }
}

const signInUser = async(email,password)=>{
 
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await setItem('userId',user.uid)
        return user
    } catch (error) {
     
        let message = "An error occurred.";

        //specifying an error
        if (error.code === "auth/invalid-email") {
            message = "The email address is invalid.";
        } else if (error.code === "auth/user-not-found") {
            message = "No user found with this email.";
        } else if (error.code === "auth/wrong-password") {
            message = "The password is incorrect.";
        }else
            message = error.message

        return { error: true, message };
    }
}

const signOutUser = async()=>{

    try {
        await signOut(auth)
        const resp = await removeItem('userId')
        return resp
    } catch (error) {
        return { error:true, message: "Error: "+ error.message };
    }
}

const getUserId = async()=>{
    try {
        const userId = await getItem('userId')
        if(userId)
            return userId
        else
            return null
    } catch (error) {
        return null
    }
}

const removeUser = async(user)=>{

    try {
        await deleteUser(user);
        await removeItem('userId');
        return {error:false}
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

export { signUpUser, signInUser, getUserId, signOutUser, removeUser }