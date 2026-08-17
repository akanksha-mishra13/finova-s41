// ============================================
// FIREBASE
// ============================================

import { initializeApp } from "firebase/app";


// ============================================
// FIREBASE AUTH
// ============================================

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";


// ============================================
// FIREBASE AI
// ============================================

import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";


// ============================================
// FIREBASE APP CHECK
// ============================================

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

  // IMPORTANT:
  // This is the Finova S41 Web App ID
  appId: "1:497415157596:web:1d249f0ddf2136deea7399",
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);


// ============================================
// FIREBASE AUTH
// ============================================

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();


// ============================================
// APP CHECK - DEVELOPMENT
// ============================================

// Allows Firebase to generate a debug token
// when running the application locally.

self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;


// IMPORTANT:
// Use the reCAPTCHA Enterprise site key
// registered for the Finova S41 Firebase app.

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6Lf7NYktAAAAANPheOuemRPXBHAEsfT3zg4Je1it"
  ),

  isTokenAutoRefreshEnabled: true,
});


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
    model: "gemini-3.6-flash",
  });


// ============================================
// DEFAULT EXPORT
// ============================================

export default app;

