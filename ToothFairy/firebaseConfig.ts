import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBAjuaGHoeeo8dEe8GqoNx1yogq_2LqU5M",
    authDomain: "toothfairy-5f8e1.firebaseapp.com",
    projectId: "toothfairy-5f8e1",
    storageBucket: "toothfairy-5f8e1.firebasestorage.app",
    messagingSenderId: "536290616402",
    appId: "1:536290616402:web:6089e36667bf5d09aa6b8b",
    measurementId: "G-WXRSLSH6LK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
