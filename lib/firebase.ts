import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDO9QTPwSLc7YEyEu-vkAewptzRVcWdF78",
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "db-ind-b9d1c"}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "db-ind-b9d1c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "db-ind-b9d1c.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "142941537714",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:142941537714:web:fbb4f4d18715688e8550ab"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

export default app
