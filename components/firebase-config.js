// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfKfLgFTdPIlzRF-iY0lI1fjwtB4fretY",
    authDomain: "hotking-ae7a7.firebaseapp.com",
    projectId: "hotking-ae7a7",
    storageBucket: "hotking-ae7a7.appspot.com",
    messagingSenderId: "652054261946",
    appId: "1:652054261946:web:bb0f9f36e37be34e829283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
