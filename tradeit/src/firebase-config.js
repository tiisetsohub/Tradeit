import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5tPGf-y0DBHZiA3153JCCvIVBR86bm-4",
    authDomain: "tradeit-ee7eb.firebaseapp.com",
    projectId: "tradeit-ee7eb",
    storageBucket: "tradeit-ee7eb.appspot.com",
    messagingSenderId: "711726893327",
    appId: "1:711726893327:web:40b502849a8d43ba9c967a",
    measurementId: "G-R5YLVNQ6K5"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);