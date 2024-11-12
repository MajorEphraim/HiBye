// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence  ,getAuth, onAuthStateChanged,createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,sendEmailVerification,updateProfile, 
    signOut } from "firebase/auth";

import { doc, setDoc, getFirestore  } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import * as SecureStore from 'expo-secure-store';

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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(SecureStore),
});
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
        db, signOut, doc, setDoc, storage, ref, uploadBytesResumable, 
        getDownloadURL 
      }