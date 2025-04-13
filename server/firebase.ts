// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqH3iUK46UUiEGbVsMNk39i8nzpMdwKXs",
  authDomain: "finance-dash-f1261.firebaseapp.com",
  projectId: "finance-dash-f1261",
  storageBucket: "finance-dash-f1261.firebasestorage.app",
  messagingSenderId: "642689646484",
  appId: "1:642689646484:web:f9d8a0ccf07c0b20941981",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
