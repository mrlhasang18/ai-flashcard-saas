'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KxTWG4diWlaiBSJWtPclcuJK87RRSy8",
  authDomain: "ai-flashcard-saas-fea49.firebaseapp.com",
  projectId: "ai-flashcard-saas-fea49",
  storageBucket: "ai-flashcard-saas-fea49.appspot.com",
  messagingSenderId: "361358237718",
  appId: "1:361358237718:web:7730fba93d6a6c28f81537",
  measurementId: "G-FBSQVWCDKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}

export {db};