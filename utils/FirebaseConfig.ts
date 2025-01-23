// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSRSYBLUvFmX5M776FQJvuHim5u0usRNs",
  authDomain: "alternova-test-c01d4.firebaseapp.com",
  projectId: "alternova-test-c01d4",
  storageBucket: "alternova-test-c01d4.firebasestorage.app",
  messagingSenderId: "428490103321",
  appId: "1:428490103321:web:8bd87b5cc12e9be5a86888"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);