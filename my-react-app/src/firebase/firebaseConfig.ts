// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBagYWAaGNyOw1IB3SQGgCfe7rdmv_KpMY",
  authDomain: "expense-tracker-4f792.firebaseapp.com",
  projectId: "expense-tracker-4f792",
  storageBucket: "expense-tracker-4f792.firebasestorage.app",
  messagingSenderId: "863864823830",
  appId: "1:863864823830:web:c5460a7e93c5c4ab161537",
  measurementId: "G-YGWJML8RXZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
