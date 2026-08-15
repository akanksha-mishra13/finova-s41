import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDC6mZAkIGHkzeUTd7lZLUau-HKeFYQWDw",
  authDomain: "finova-s41.firebaseapp.com",
  projectId: "finova-s41",
  storageBucket: "finova-s41.firebasestorage.app",
  messagingSenderId: "497415157596",
  appId: "1:497415157596:web:0261de1c080c63f3ea7399",
  measurementId: "G-9TJ4FMHQ2X",
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firebase Authentication

export const auth = getAuth(app);


// Google Authentication

export const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});


// Analytics

export const analytics =
  getAnalytics(app);


export default app;