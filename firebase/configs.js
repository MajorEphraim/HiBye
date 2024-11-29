// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence  ,getAuth, onAuthStateChanged,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification,
    updateProfile, signOut, deleteUser } from "firebase/auth";

import { doc, setDoc, getFirestore, collection,query, where, onSnapshot,
        getDocs, addDoc, updateDoc, increment  } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,
        deleteObject } from 'firebase/storage'

import * as SecureStore from 'expo-secure-store';

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
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
        getDownloadURL, deleteObject, deleteUser, onAuthStateChanged,
        collection,query, where, onSnapshot, getDocs, addDoc, updateDoc, 
        increment
      }