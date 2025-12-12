// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSDt10j4JBGXnoVW2BMTZhv-k0Chv6CrM",
  authDomain: "netflix-gpt-e4ee3.firebaseapp.com",
  projectId: "netflix-gpt-e4ee3",
  storageBucket: "netflix-gpt-e4ee3.firebasestorage.app",
  messagingSenderId: "452427206812",
  appId: "1:452427206812:web:34dd2e16fd1ef7be629d59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
