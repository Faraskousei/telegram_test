'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Terjadi Error</h2>
              <p className="text-gray-600 mb-4">
                Maaf, terjadi error yang tidak terduga. Silakan refresh halaman.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Refresh Halaman
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
