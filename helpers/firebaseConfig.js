// Import required Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX_x28gJzGUKzFFjw9UMsk5MbzEn485uM",
  authDomain: "medi-plus-d4ae3.firebaseapp.com",
  projectId: "medi-plus-d4ae3",
  storageBucket: "medi-plus-d4ae3.appspot.com",
  messagingSenderId: "777621078223",
  appId: "1:777621078223:web:d20b23f9edaf3ebc6a77ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth;

// Check if the platform is web or native
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize Firestore
const firestore = getFirestore(app);

// Export the initialized Firebase services
export { auth, firestore };
