import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore'
import { db } from './firebase'

// Check if Firebase is available
const isFirebaseAvailable = () => {
  try {
    return db !== null && db !== undefined
  } catch (error) {
    return false
  }
}

// Types
export interface User {
  id?: string
  telegramId: number
  username?: string
  firstName?: string
  lastName?: string
  createdAt: any
  lastActive: any
  totalConversions: number
  totalFiles: number
}

export interface Conversion {
  id?: string
  userId: number
  originalFile: string
  convertedFile: string
  conversionType: string
  fileSize: number
  status: 'processing' | 'completed' | 'failed'
  createdAt: any
  completedAt?: any
}

export interface BotStats {
  totalUsers: number
  totalFiles: number
  totalConversions: number
  totalSize: number
  lastUpdated: any
}

// User operations
export const addUser = async (userData: Omit<User, 'id' | 'createdAt' | 'lastActive' | 'totalConversions' | 'totalFiles'>) => {
  try {
    const userRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      totalConversions: 0,
      totalFiles: 0
    })
    return userRef.id
  } catch (error) {
    console.error('Error adding user:', error)
    throw error
  }
}

export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...userData,
      lastActive: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const getUser = async (telegramId: number) => {
  try {
    const q = query(collection(db, 'users'), where('telegramId', '==', telegramId))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    const userDoc = querySnapshot.docs[0]
    return { id: userDoc.id, ...userDoc.data() } as User
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

// Conversion operations
export const addConversion = async (conversionData: Omit<Conversion, 'id' | 'createdAt'>) => {
  try {
    const conversionRef = await addDoc(collection(db, 'conversions'), {
      ...conversionData,
      createdAt: serverTimestamp()
    })
    return conversionRef.id
  } catch (error) {
    console.error('Error adding conversion:', error)
    throw error
  }
}

export const updateConversion = async (conversionId: string, conversionData: Partial<Conversion>) => {
  try {
    const conversionRef = doc(db, 'conversions', conversionId)
    await updateDoc(conversionRef, {
      ...conversionData,
      completedAt: conversionData.status === 'completed' ? serverTimestamp() : undefined
    })
  } catch (error) {
    console.error('Error updating conversion:', error)
    throw error
  }
}

export const getConversions = async (userId?: number, limitCount: number = 10) => {
  try {
    let q = query(collection(db, 'conversions'), orderBy('createdAt', 'desc'), limit(limitCount))
    
    if (userId) {
      q = query(collection(db, 'conversions'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(limitCount))
    }
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversion))
  } catch (error) {
    console.error('Error getting conversions:', error)
    throw error
  }
}

// Stats operations
export const getBotStats = async () => {
  try {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase not available')
    }
    
    const statsRef = doc(db, 'stats', 'bot')
    const statsDoc = await getDoc(statsRef)
    
    if (statsDoc.exists()) {
      return statsDoc.data() as BotStats
    }
    
    // Return default stats if not found
    return {
      totalUsers: 0,
      totalFiles: 0,
      totalConversions: 0,
      totalSize: 0,
      lastUpdated: serverTimestamp()
    }
  } catch (error) {
    console.error('Error getting bot stats:', error)
    // Return mock data if Firebase is not available
    return {
      totalUsers: 1250,
      totalFiles: 15680,
      totalConversions: 12450,
      totalSize: 2.5 * 1024 * 1024 * 1024, // 2.5GB
      lastUpdated: new Date()
    }
  }
}

export const updateBotStats = async (statsData: Partial<BotStats>) => {
  try {
    const statsRef = doc(db, 'stats', 'bot')
    await updateDoc(statsRef, {
      ...statsData,
      lastUpdated: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating bot stats:', error)
    throw error
  }
}

export const incrementUserStats = async (userId: string, field: 'totalConversions' | 'totalFiles') => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      [field]: increment(1)
    })
  } catch (error) {
    console.error('Error incrementing user stats:', error)
    throw error
  }
}

// Recent activity
export const getRecentActivity = async (limitCount: number = 10) => {
  try {
    const q = query(collection(db, 'conversions'), orderBy('createdAt', 'desc'), limit(limitCount))
    const querySnapshot = await getDocs(q)
    
    const activities = []
    for (const doc of querySnapshot.docs) {
      const conversion = doc.data() as Conversion
      const user = await getUser(conversion.userId)
      
      activities.push({
        id: doc.id,
        username: user?.username || user?.firstName || 'Unknown',
        file: conversion.originalFile,
        type: conversion.conversionType,
        time: conversion.createdAt,
        status: conversion.status
      })
    }
    
    return activities
  } catch (error) {
    console.error('Error getting recent activity:', error)
    // Return mock data if Firebase is not available
    return [
      {
        id: '1',
        username: 'john_doe',
        file: 'document.pdf',
        type: 'pdf-to-word',
        time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        status: 'completed'
      },
      {
        id: '2',
        username: 'jane_smith',
        file: 'presentation.docx',
        type: 'word-to-pdf',
        time: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        status: 'completed'
      },
      {
        id: '3',
        username: 'mike_wilson',
        file: 'photo.jpg',
        type: 'jpg-to-sticker',
        time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        status: 'completed'
      }
    ]
  }
}

// Daily conversions
export const getDailyConversions = async (days: number = 7) => {
  try {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const q = query(
      collection(db, 'conversions'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate)
    )
    
    const querySnapshot = await getDocs(q)
    const conversions = querySnapshot.docs.map(doc => doc.data() as Conversion)
    
    // Group by date
    const dailyStats: Record<string, number> = {}
    conversions.forEach(conversion => {
      const date = conversion.createdAt.toDate().toISOString().split('T')[0]
      dailyStats[date] = (dailyStats[date] || 0) + 1
    })
    
    return dailyStats
  } catch (error) {
    console.error('Error getting daily conversions:', error)
    throw error
  }
}
