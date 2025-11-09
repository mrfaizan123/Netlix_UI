// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5pCk_W-fMJHBkE7bmf2uIiNQ_QglYQeE",
  authDomain: "react-netflix-a5dfb.firebaseapp.com",
  projectId: "react-netflix-a5dfb",
  storageBucket: "react-netflix-a5dfb.firebasestorage.app",
  messagingSenderId: "939328807691",
  appId: "1:939328807691:web:12d35df992afeb7d2b380e",
  measurementId: "G-WBNWT43ZWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)