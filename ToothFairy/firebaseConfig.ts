import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBAjuaGHoeeo8dEe8GqoNx1yogq_2LqU5M",
    authDomain: "toothfairy-5f8e1.firebaseapp.com",
    databaseURL: "https://toothfairy-5f8e1-default-rtdb.firebaseio.com",
    projectId: "toothfairy-5f8e1",
    storageBucket: "toothfairy-5f8e1.appspot.com",
    messagingSenderId: "536290616402",
    appId: "1:536290616402:web:6089e36667bf5d09aa6b8b",
    measurementId: "G-WXRSLSH6LK"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);
export { auth, database };