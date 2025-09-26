'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface StatsData {
  total_users: number
  total_files: number
  total_size_mb: number
  daily_conversions: Record<string, number>
  top_conversions: Record<string, number>
}

export default function StatsChart() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="card">
        <p className="text-gray-500">Tidak dapat memuat data statistik</p>
      </div>
    )
  }

  const dailyData = Object.entries(stats.daily_conversions)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7)

  const maxConversions = Math.max(...dailyData.map(([, value]) => value))

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Statistik Harian</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>7 hari terakhir</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {dailyData.map(([date, value], index) => {
          const percentage = (value / maxConversions) * 100
          const isToday = index === dailyData.length - 1
          
          return (
            <div key={date} className="flex items-center space-x-3">
              <div className="text-xs text-gray-500 w-16">
                {new Date(date).toLocaleDateString('id-ID', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isToday ? 'bg-primary-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm font-medium text-gray-700 w-8 text-right">
                {value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">{stats.total_users}</p>
            <p className="text-xs text-gray-500">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{stats.total_files}</p>
            <p className="text-xs text-gray-500">Files Processed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{stats.total_size_mb}MB</p>
            <p className="text-xs text-gray-500">Data Processed</p>
          </div>
        </div>
      </div>

      {/* Top Conversions */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Top Conversions</h4>
        <div className="space-y-2">
          {Object.entries(stats.top_conversions)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
            .map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {type.replace('-', ' → ')}
                </span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
