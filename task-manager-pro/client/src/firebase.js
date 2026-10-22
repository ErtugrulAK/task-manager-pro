import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuration comes from client/.env.local (see .env.example).
// Firebase web config is not a secret (it ships in any deployed JS bundle),
// but the values must belong to whoever runs this app, so there are no
// hard-coded fallbacks pointing at the original author's project.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Firebase is not configured. Copy .env.example to .env.local and fill in your project credentials."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Authentication services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };