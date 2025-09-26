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
      color: 'gradient-primary',
      iconColor: 'text-white'
    },
    {
      icon: FileText,
      title: 'Word ke PDF',
      description: 'Ubah dokumen Word menjadi file PDF yang rapi',
      color: 'gradient-secondary',
      iconColor: 'text-white'
    },
    {
      icon: Image,
      title: 'JPG ke Sticker',
      description: 'Buat sticker pack dari gambar JPG untuk Telegram',
      color: 'gradient-accent',
      iconColor: 'text-white'
    },
    {
      icon: Download,
      title: 'File Converter',
      description: 'Konversi berbagai format file dengan mudah',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      iconColor: 'text-white'
    },
    {
      icon: Zap,
      title: 'AI Processing',
      description: 'Pemrosesan file dengan teknologi AI terdepan',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      iconColor: 'text-white'
    },
    {
      icon: Shield,
      title: 'Secure Upload',
      description: 'Upload dan proses file dengan keamanan maksimal',
      color: 'bg-gradient-to-r from-indigo-500 to-blue-500',
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Telegram Multi-Bot</h1>
                  <p className="text-sm text-gray-600">Dashboard Admin • Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="btn-ghost">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
                <button className="btn-primary">
                  <Users className="h-5 w-5 mr-2" />
                  Users
                </button>
                <LogoutButton />
              </div>
            </div>
            
            {/* Music Player */}
            <div className="pb-4">
              <MusicPlayer />
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">New Features Available</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Convert Files with{' '}
              <span className="text-gradient">AI Power</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your documents, images, and files with our advanced AI-powered conversion tools. 
              Fast, secure, and reliable processing for all your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Start Converting
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <Star className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+12%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Files Processed</p>
                <p className="text-3xl font-bold text-white">{stats.totalFiles.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Chats</p>
                <p className="text-3xl font-bold text-white">{stats.activeConversations}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Uptime</p>
                <p className="text-3xl font-bold text-white">{stats.uptime}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">99.9%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* File Upload Section */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload & Convert Files</h2>
                  <p className="text-gray-600">Drag and drop your files to get started</p>
                </div>
                <div className="flex space-x-3">
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
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Available Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group-hover:shadow-lg">
                      <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatsChart />
          <ActivityFeed />
        </div>
      </main>
      </div>
    </AuthGuard>
  )
}
