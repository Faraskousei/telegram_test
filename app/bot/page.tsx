'use client'

import { useState } from 'react'
import { Bot, Send, FileText, Image, Download, Users, Zap, Shield } from 'lucide-react'

export default function BotPage() {
  const [message, setMessage] = useState('')

  const features = [
    {
      icon: FileText,
      title: 'PDF ke Word',
      description: 'Kirim file PDF untuk dikonversi ke Word',
      color: 'bg-red-500'
    },
    {
      icon: FileText,
      title: 'Word ke PDF',
      description: 'Kirim file Word untuk dikonversi ke PDF',
      color: 'bg-blue-500'
    },
    {
      icon: Image,
      title: 'JPG ke Sticker',
      description: 'Kirim gambar untuk dibuat sticker pack',
      color: 'bg-green-500'
    },
    {
      icon: Download,
      title: 'File Converter',
      description: 'Konversi berbagai format file',
      color: 'bg-purple-500'
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      const telegramUrl = `https://t.me/Backup_indBot?start=${encodeURIComponent(message)}`
      window.open(telegramUrl, '_blank')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Telegram Multi-Bot</h1>
                <p className="text-sm text-gray-600">Bot Gratis untuk Semua Orang</p>
              </div>
            </div>
            <a
              href="https://t.me/Backup_indBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Bot className="h-5 w-5 mr-2" />
              Chat Bot
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bot Telegram{' '}
            <span className="text-gradient">Multi-Function</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Konversi file, buat sticker, dan berbagai tools lainnya secara gratis. 
            Bot ini tersedia untuk semua orang tanpa perlu login!
          </p>
          
          {/* Quick Message */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kirim pesan ke bot..."
                className="flex-1 input-field"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="btn-primary"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/Backup_indBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              <Bot className="h-5 w-5 mr-2" />
              Mulai Chat
            </a>
            <a
              href="/login"
              className="btn-secondary text-lg px-8 py-4"
            >
              <Users className="h-5 w-5 mr-2" />
              Admin Dashboard
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cara Menggunakan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Buka Bot</h4>
              <p className="text-gray-600">Klik link bot atau cari @Backup_indBot di Telegram</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Kirim File</h4>
              <p className="text-gray-600">Kirim file PDF, Word, atau gambar yang ingin dikonversi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download Hasil</h4>
              <p className="text-gray-600">Bot akan memproses dan mengirim hasil konversi</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="card text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">1,000+</h3>
            <p className="text-gray-600">Pengguna Aktif</p>
          </div>
          <div className="card text-center">
            <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">File Diproses</p>
          </div>
          <div className="card text-center">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Uptime</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bot className="h-8 w-8 text-blue-400" />
            <h3 className="text-xl font-bold">Telegram Multi-Bot</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Bot Telegram gratis untuk konversi file dan berbagai tools lainnya
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://t.me/Backup_indBot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Chat Bot
            </a>
            <a
              href="/login"
              className="text-blue-400 hover:text-blue-300"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
