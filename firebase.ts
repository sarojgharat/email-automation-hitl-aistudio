// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// =================================================================================
// 🔥 ATTENTION! DEVELOPER ACTION REQUIRED! 🔥
//
// You are seeing placeholder credentials. Firebase authentication WILL FAIL
// with an 'auth/configuration-not-found' error until you replace these
// values with your actual Firebase project's configuration.
//
// HOW TO FIX:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Select your project.
// 3. Go to Project Settings (click the gear icon ⚙️ in the top-left).
// 4. In the "General" tab, scroll down to the "Your apps" section.
// 5. Find your web app, and under "Firebase SDK snippet", select "Config".
// 6. Copy the `firebaseConfig` object and paste it over the object below.
// =================================================================================
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Check if the placeholder API key is still in use. This is used in App.tsx
// to show a helpful error message if the config is not filled out.
export const isFirebaseConfigured = firebaseConfig.apiKey !== "dummy";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
