'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { 
  Bot, 
  Users, 
  FileText, 
  Activity, 
  TrendingUp, 
  Clock,
  MessageSquare,
  Download,
  Settings,
  LogOut,
  BarChart3,
  PieChart
} from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: any
  lastLogin: any
  totalConversions: number
  totalFiles: number
  isActive: boolean
}

interface Conversion {
  id: string
  userId: string
  originalFile: string
  convertedFile: string
  conversionType: string
  fileSize: number
  status: string
  createdAt: any
  completedAt?: any
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [conversions, setConversions] = useState<Conversion[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalConversions: 0,
    totalFiles: 0,
    activeUsers: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/login-new')
      return
    }
    
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const usersSnapshot = await getDocs(usersQuery)
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[]
      setUsers(usersData)

      // Fetch conversions
      const conversionsQuery = query(
        collection(db, 'conversions'), 
        orderBy('createdAt', 'desc'), 
        limit(10)
      )
      const conversionsSnapshot = await getDocs(conversionsQuery)
      const conversionsData = conversionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Conversion[]
      setConversions(conversionsData)

      // Calculate stats
      const totalUsers = usersData.length
      const totalConversions = conversionsData.length
      const totalFiles = usersData.reduce((sum, user) => sum + user.totalFiles, 0)
      const activeUsers = usersData.filter(user => user.isActive).length

      setStats({
        totalUsers,
        totalConversions,
        totalFiles,
        activeUsers
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Error memuat data dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    toast.success('Logout berhasil!')
    router.push('/login-new')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Firebase Analytics • Real-time Data</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-ghost">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </button>
              <button onClick={handleLogout} className="btn-ghost text-red-500 hover:text-red-600">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConversions}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-500" />
              Recent Users
            </h2>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{user.totalConversions} conversions</p>
                    <p className="text-xs text-gray-400">{user.totalFiles} files</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Conversions */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-green-500" />
              Recent Conversions
            </h2>
            <div className="space-y-4">
              {conversions.slice(0, 5).map((conversion) => (
                <div key={conversion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{conversion.originalFile}</p>
                      <p className="text-sm text-gray-500">{conversion.conversionType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 capitalize">{conversion.status}</p>
                    <p className="text-xs text-gray-400">{(conversion.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
