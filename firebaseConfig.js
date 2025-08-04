// firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  indexedDBLocalPersistence,
  initializeAuth
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCovLQFDGKl7vhGfrTHP6_pvt9B6KMyxkQ",
  authDomain: "outlearn-f53c3.firebaseapp.com",
  projectId: "outlearn-f53c3",
  storageBucket: "outlearn-f53c3.appspot.com", // fixed typo: was missing ".com"
  messagingSenderId: "443979208709",
  appId: "1:443979208709:web:f3fc93262c29726c20246c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with proper persistence
const auth = Platform.OS === 'web'
  ? initializeAuth(app, { persistence: indexedDBLocalPersistence })
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

// Initialize Firestore
const db = getFirestore(app);

// Export auth and db
export { auth, db };

