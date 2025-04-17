// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "finance-dash-36f23.firebaseapp.com",
  projectId: "finance-dash-36f23",
  storageBucket: "finance-dash-36f23.firebasestorage.app",
  messagingSenderId: "551177573300",
  appId: "1:551177573300:web:17fcd431ee1927608098e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
