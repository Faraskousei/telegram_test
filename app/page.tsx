'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  Image, 
  Download, 
  Upload, 
  Bot, 
  Settings,
  Users,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import SimpleFileUpload from '@/components/SimpleFileUpload'
import BotStats from '@/components/BotStats'
import FeatureCard from '@/components/FeatureCard'
import StatsChart from '@/components/StatsChart'
import ActivityFeed from '@/components/ActivityFeed'
import AuthGuard from '@/components/AuthGuard'
import LogoutButton from '@/components/LogoutButton'
import MusicPlayer from '@/components/MusicPlayer'

export default function Home() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFiles: 0,
    activeConversations: 0,
    uptime: '0d 0h 0m'
  })

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/bot')
      return
    } else {
      router.push('/dashboard')
      return
    }
  }, [router])

  const features = [
    {
      icon: FileText,
      title: 'PDF ke Word',
      description: 'Konversi file PDF menjadi dokumen Word dengan kualitas tinggi',
      color: 'bg-blue-600',
      iconColor: 'text-white'
    },
    {
      icon: FileText,
      title: 'Word ke PDF',
      description: 'Ubah dokumen Word menjadi file PDF yang rapi',
      color: 'bg-green-600',
      iconColor: 'text-white'
    },
    {
      icon: Image,
      title: 'JPG ke Sticker',
      description: 'Buat sticker pack dari gambar JPG untuk Telegram',
      color: 'bg-purple-600',
      iconColor: 'text-white'
    },
    {
      icon: Download,
      title: 'File Converter',
      description: 'Konversi berbagai format file dengan mudah',
      color: 'bg-gray-600',
      iconColor: 'text-white'
    },
    {
      icon: Zap,
      title: 'AI Processing',
      description: 'Pemrosesan file dengan teknologi AI terdepan',
      color: 'bg-orange-600',
      iconColor: 'text-white'
    },
    {
      icon: Shield,
      title: 'Secure Upload',
      description: 'Upload dan proses file dengan keamanan maksimal',
      color: 'bg-indigo-600',
      iconColor: 'text-white'
    }
  ]

  useEffect(() => {
    // Simulasi data stats
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalFiles: prev.totalFiles + Math.floor(Math.random() * 5),
        activeConversations: Math.floor(Math.random() * 20),
        uptime: '7d 12h 45m'
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
                  <p className="text-sm text-gray-600">Dashboard Admin</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-ghost">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button className="btn-primary">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </button>
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Convert Files with AI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Transform your documents, images, and files with our conversion tools. 
              Fast, secure, and reliable processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary">
                Start Converting
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              <button className="btn-secondary">
                <Star className="h-4 w-4 mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Files Processed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFiles.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+8%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Chats</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeConversations}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+3%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.uptime}</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">99.9%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* File Upload Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Upload & Convert Files</h2>
                    <p className="text-gray-600">Drag and drop your files to get started</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-secondary">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </button>
                    <button className="btn-secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
                <SimpleFileUpload />
              </div>
            </div>

            {/* Features Grid */}
            <div>
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Features</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="group">
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center`}>
                          <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsChart />
            <ActivityFeed />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
