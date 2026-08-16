// src/config/firebase.js

import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";

import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyDC6mZAkIGHkzeUTd7lZLUau-HKeFYQWDw",
  authDomain: "finova-s41.firebaseapp.com",
  projectId: "finova-s41",
  storageBucket: "finova-s41.firebasestorage.app",
  messagingSenderId: "497415157596",
  appId: "1:497415157596:web:0261de1c080c63f3ea7399",
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);


// ============================================
// FIREBASE AUTHENTICATION
// ============================================

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();


// ============================================
// FIREBASE APP CHECK
// ============================================

const RECAPTCHA_SITE_KEY =
  "6Lf7NYktAAAAANPheOuemRPXBHAEsfT3zg4Je1it";


// Only initialize reCAPTCHA App Check
// when running on the deployed application.

if (window.location.hostname !== "localhost") {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      RECAPTCHA_SITE_KEY
    ),
    isTokenAutoRefreshEnabled: true,
  });
}


// ============================================
// FIREBASE AI LOGIC
// ============================================

const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});


// ============================================
// GEMINI MODEL
// ============================================

export const geminiModel =
  getGenerativeModel(ai, {
    model: "gemini-2.5-flash",
  });


// ============================================
// EXPORT FIREBASE APP
// ============================================

export default app;