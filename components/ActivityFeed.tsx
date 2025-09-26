'use client'

import { useState, useEffect } from 'react'
import { Clock, User, FileText, Image, Download } from 'lucide-react'

interface ActivityItem {
  username: string
  file: string
  type: string
  time: string
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activity?limit=10')
      const data = await response.json()
      setActivities(data.data)
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'pdf-to-word':
      case 'word-to-pdf':
        return FileText
      case 'jpg-to-sticker':
      case 'image-to-pdf':
        return Image
      default:
        return Download
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'pdf-to-word':
        return 'text-red-500 bg-red-100'
      case 'word-to-pdf':
        return 'text-blue-500 bg-blue-100'
      case 'jpg-to-sticker':
        return 'text-green-500 bg-green-100'
      case 'image-to-pdf':
        return 'text-purple-500 bg-purple-100'
      default:
        return 'text-gray-500 bg-gray-100'
    }
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Baru saja'
    if (diffInMinutes < 60) return `${diffInMinutes}m yang lalu`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h yang lalu`
    return date.toLocaleDateString('id-ID')
  }

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
        <button
          onClick={fetchActivities}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Belum ada aktivitas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type)
            const colorClass = getActivityColor(activity.type)
            
            return (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {activity.username}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {activity.file}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${colorClass}`}>
                      {activity.type.replace('-', ' → ')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTime(activity.time)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
