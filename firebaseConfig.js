import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlBk10UN9vz_RQcWQcY0_wN6YoONXdYcQ",
  authDomain: "app-chat-2ec06.firebaseapp.com",
  projectId: "app-chat-2ec06",
  storageBucket: "app-chat-2ec06.appspot.com",
  messagingSenderId: "535828197181",
  appId: "1:535828197181:web:ceb541fb0d7f409e8edf54",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, " users");
export const roomsRef = collection(db, " rooms");
