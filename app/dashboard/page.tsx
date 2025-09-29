'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, FileText, Repeat, Activity, Loader2, LogOut, Bot } from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'
import LogoutButton from '@/components/LogoutButton'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import toast from 'react-hot-toast'

interface User {
  uid: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

interface Conversion {
  id: string
  userId: string
  originalFile: string
  convertedFile: string
  conversionType: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [totalConversions, setTotalConversions] = useState(0)
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [recentConversions, setRecentConversions] = useState<Conversion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total users
        const usersRef = collection(db, 'admins') // Assuming 'admins' collection for registered users
        const usersQuery = query(usersRef)
        const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
          setTotalUsers(snapshot.size)
          setRecentUsers(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5))
        }, (err) => {
          console.error('Error fetching users:', err)
          setError('Failed to load user data.')
          toast.error('Failed to load user data.')
        })

        // Fetch total conversions and files
        const conversionsRef = collection(db, 'conversions')
        const conversionsQuery = query(conversionsRef)
        const unsubscribeConversions = onSnapshot(conversionsQuery, (snapshot) => {
          setTotalConversions(snapshot.size)
          let filesCount = 0
          snapshot.docs.forEach(doc => {
            // Assuming each conversion represents one file
            filesCount++ 
          })
          setTotalFiles(filesCount)
          setRecentConversions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversion)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5))
        }, (err) => {
          console.error('Error fetching conversions:', err)
          setError('Failed to load conversion data.')
          toast.error('Failed to load conversion data.')
        })

        setLoading(false)
        return () => {
          unsubscribeUsers()
          unsubscribeConversions()
        }
      } catch (err) {
        console.error('Error in fetchDashboardData:', err)
        setError('Failed to load dashboard data.')
        toast.error('Failed to load dashboard data.')
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-3 text-lg text-gray-700">Loading Dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Telegram Bot</h1>
                  <p className="text-sm text-gray-600">Admin Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
            <div className="card flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Files Processed</p>
                <p className="text-xl font-bold text-gray-900">{totalFiles}</p>
              </div>
            </div>
            <div className="card flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Repeat className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Conversions</p>
                <p className="text-xl font-bold text-gray-900">{totalConversions}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Recent Users
              </h3>
              <ul className="space-y-3">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <li key={user.uid} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No recent users.</p>
                )}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Recent Conversions
              </h3>
              <ul className="space-y-3">
                {recentConversions.length > 0 ? (
                  recentConversions.map((conversion) => (
                    <li key={conversion.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{conversion.originalFile}</p>
                        <p className="text-xs text-gray-500">
                          {conversion.conversionType} ({conversion.status})
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No recent conversions.</p>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}