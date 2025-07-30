// firebaseConfig.js
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, indexedDBLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyCovLQFDGKl7vhGfrTHP6_pvt9B6KMyxkQ",
    authDomain: "outlearn-f53c3.firebaseapp.com",
    projectId: "outlearn-f53c3",
    storageBucket: "outlearn-f53c3.firebasestorage.app",
    messagingSenderId: "443979208709",
    appId: "1:443979208709:web:f3fc93262c29726c20246c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth with appropriate persistence based on platform
let auth;
if (Platform.OS === 'web') {
  // Use browserLocalPersistence for web
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
  });
} else {
  // For React Native, initialize without specifying persistence for now
  auth = initializeAuth(app);
}

const db = getFirestore(app);

export { auth, db };

