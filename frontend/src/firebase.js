import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Setup Firebase configuration using environment variables
// Note: You must provide these values in a .env file at the frontend root
// e.g. VITE_FIREBASE_API_KEY="..."

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAkcRPhmfC53D3YhyCmebXfCRku7TJ32Rg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "medicare-49001.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "medicare-49001",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "medicare-49001.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
