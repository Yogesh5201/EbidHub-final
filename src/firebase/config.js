import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Your updated Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwtY0XqQh-Uq306OVYEeBBmQbm6L0EUWI",
  authDomain: "ebidhub-aa766.firebaseapp.com",
  databaseURL: "https://ebidhub-aa766-default-rtdb.firebaseio.com", // Make sure this matches your actual database URL
  projectId: "ebidhub-aa766",
  storageBucket: "ebidhub-aa766.firebasestorage.app",
  messagingSenderId: "710211885105",
  appId: "1:710211885105:web:c40920030caf92664f9d10",
  measurementId: "G-79R6MRMB1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;