import { initializeApp, getApps, getApp } from 'firebase/app';

let apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
if (!apiKey || apiKey === 'your_firebase_api_key_here') {
  apiKey = 'AIzaSyDummyKeyForBuildOnly12345678901';
}

const firebaseConfig = {
  apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'dummy',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123:web:123',
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
