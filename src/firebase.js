// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzqrkwb4jDzgQT7jE9gdr5LFizil_hks0",
  authDomain: "twitter-v2-700ca.firebaseapp.com",
  projectId: "twitter-v2-700ca",
  storageBucket: "twitter-v2-700ca.appspot.com",
  messagingSenderId: "77812599088",
  appId: "1:77812599088:web:4faba49310feb0da2ca0f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
