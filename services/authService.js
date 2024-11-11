import { auth, createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signOut } 
from '../firebase/configs'

const signUpUser = async(email,password)=>{

    try {

        // // Client-Side (JavaScript)
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        // // User created successfully
        // const user = userCredential.user;
        // // ...
        // })
        // .catch((error) => {
        // // Handle sign-up errors (e.g., email already exists)
        // // ...
        // });

        const userCredential = await createUserWithEmailAndPassword(email, password)
        const user = userCredential.user
        return user
    } catch (error) {
        return error.message
    }
}

const signInUser = async(email,password)=>{

    try {

        // // Client-Side (JavaScript)
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        // // User created successfully
        // const user = userCredential.user;
        // // ...
        // })
        // .catch((error) => {
        // // Handle sign-up errors (e.g., email already exists)
        // // ...
        // });

        const userCredential = await signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        return user
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

export { signUpUser, signInUser }