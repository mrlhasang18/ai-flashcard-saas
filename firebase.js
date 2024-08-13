// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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