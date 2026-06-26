// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsHlT9LO0oe5Q0E7cp_Isu4EKMUS1GjGU",
  authDomain: "spend-control-77856.firebaseapp.com",
  projectId: "spend-control-77856",
  storageBucket: "spend-control-77856.firebasestorage.app",
  messagingSenderId: "1031534753538",
  appId: "1:1031534753538:web:15f4347e773df5ba54741b",
  measurementId: "G-DC0K9995QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);