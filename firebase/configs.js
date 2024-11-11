// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,sendEmailVerification,updateProfile, 
    signOut } from "firebase/auth";
import { doc, setDoc, getFirestore  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_zQgPUUN2Mk5JE44kL18YJLyRPo5C6Zc",
  authDomain: "hibye-3bb78.firebaseapp.com",
  projectId: "hibye-3bb78",
  storageBucket: "hibye-3bb78.firebasestorage.app",
  messagingSenderId: "359270376161",
  appId: "1:359270376161:web:1e4a520e05608ba8720da0",
  measurementId: "G-6W5PBC1C26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
        db, signOut, doc, setDoc }