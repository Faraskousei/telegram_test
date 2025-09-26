import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78",
  authDomain: `${process.env.FIREBASE_PROJECT_ID || "telegram-bot-12345"}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID || "telegram-bot-12345",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "telegram-bot-12345.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

export default app
