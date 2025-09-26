import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

// Firebase Admin configuration
const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "db-ind-b9d1c",
  // For production, you would use a service account key
  // For development, we'll use the default credentials
}

// Initialize Firebase Admin (only if not already initialized)
let adminApp
if (getApps().length === 0) {
  try {
    adminApp = initializeApp(firebaseAdminConfig)
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error)
    // Continue without admin features
  }
} else {
  adminApp = getApps()[0]
}

// Export services
export const adminDb = adminApp ? getFirestore(adminApp) : null
export const adminAuth = adminApp ? getAuth(adminApp) : null

export default adminApp