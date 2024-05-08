import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDX_x28gJzGUKzFFjw9UMsk5MbzEn485uM",
  authDomain: "medi-plus-d4ae3.firebaseapp.com",
  projectId: "medi-plus-d4ae3",
  storageBucket: "medi-plus-d4ae3.appspot.com",
  messagingSenderId: "777621078223",
  appId: "1:777621078223:web:d20b23f9edaf3ebc6a77ba",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
