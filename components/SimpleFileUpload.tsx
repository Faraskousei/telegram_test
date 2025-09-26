'use client'

import { useState } from 'react'
import { Upload, FileText, Image, Download, X, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface SimpleFileUploadProps {
  onFileSelect?: (file: File) => void
}

export default function SimpleFileUpload({ onFileSelect }: SimpleFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [conversionType, setConversionType] = useState('pdf-to-word')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file
      if (file.size > 20 * 1024 * 1024) {
        toast.error('File terlalu besar! Maksimal 20MB.')
        return
      }
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Tipe file tidak didukung!')
        return
      }
      
      setSelectedFile(file)
      if (onFileSelect) {
        onFileSelect(file)
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Pilih file terlebih dahulu')
      return
    }

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', conversionType)

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success('File berhasil dikonversi!')
          
          // Simulate download
          if (result.data?.download_url) {
            const link = document.createElement('a')
            link.href = result.data.download_url
            link.download = result.data.converted_file || selectedFile.name
            link.click()
          }
        } else {
          throw new Error(result.error || 'Conversion failed')
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(`Error: ${error instanceof Error ? error.message : 'Upload failed'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h3>
        
        {/* File Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Konversi
          </label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
            className="input-field"
          >
            <option value="pdf-to-word">PDF → Word</option>
            <option value="word-to-pdf">Word → PDF</option>
            <option value="image-to-pdf">Image → PDF</option>
            <option value="jpg-to-sticker">JPG → Sticker</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih File
          </label>
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="input-field"
          />
        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              {selectedFile ? 'Upload & Convert' : 'Pilih File Terlebih Dahulu'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
