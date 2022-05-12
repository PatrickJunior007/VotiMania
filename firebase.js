// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRT5CrIrPhSk9AcZhTOKGMwRspuhAZfCI",
  authDomain: "votimania-6fcdb.firebaseapp.com",
  projectId: "votimania-6fcdb",
  storageBucket: "votimania-6fcdb.appspot.com",
  messagingSenderId: "623972975987",
  appId: "1:623972975987:web:663f6e68affb960395f106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//database access
export const db = getFirestore(app);


