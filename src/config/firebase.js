
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

const firebaseConfig = {
  apiKey: "AIzaSyDC6mZAkIGHkzeUTd7lZLUau-HKeFYQWDw",
  authDomain: "finova-s41.firebaseapp.com",
  projectId: "finova-s41",
  storageBucket: "finova-s41.firebasestorage.app",
  messagingSenderId: "497415157596",
  appId: "1:497415157596:web:1d249f0ddf2136deea7399",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

if (isDevelopment) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6Lf7NYktAAAAANPheOuemRPXBHAEsfT3zg4Je1it"
  ),
  isTokenAutoRefreshEnabled: true,
});

const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

export const geminiModel =
  getGenerativeModel(ai, {
    model: "gemini-3.6-flash",
  });

export default app;

