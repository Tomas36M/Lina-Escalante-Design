import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZ0GS4JCQUkHScIlw-YQzSQZQhp0w7-Kg",
    authDomain: "escalante-ecommerce-jewerly.firebaseapp.com",
    projectId: "escalante-ecommerce-jewerly",
    storageBucket: "escalante-ecommerce-jewerly.appspot.com",
    messagingSenderId: "479726499840",
    appId: "1:479726499840:web:5e66a808434fa8337700e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
