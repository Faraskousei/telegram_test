'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Image, Download, X, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileWithPreview extends File {
  preview?: string
  id: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [conversionType, setConversionType] = useState('pdf-to-word')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading' as const,
      progress: 0
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Real upload dan processing
    for (const file of newFiles) {
      await uploadFile(file)
    }
    
    toast.success(`${acceptedFiles.length} file berhasil diupload`)
  }, [])

  const uploadFile = async (file: FileWithPreview) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', conversionType)

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'completed', progress: 100 }
            : f
        ))
        
        toast.success('File berhasil dikonversi!')
        
        // Download hasil konversi
        if (result.data?.download_url) {
          const link = document.createElement('a')
          link.href = result.data.download_url
          link.download = result.data.converted_file
          link.click()
        }
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ))
      toast.error('Error saat mengupload file!')
    }
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: true
  })

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return FileText
    if (file.type.includes('image')) return Image
    return FileText
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'text-blue-500'
      case 'processing': return 'text-yellow-500'
      case 'completed': return 'text-green-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Conversion Type Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'pdf-to-word', label: 'PDF → Word', color: 'bg-red-100 text-red-700' },
          { value: 'word-to-pdf', label: 'Word → PDF', color: 'bg-blue-100 text-blue-700' },
          { value: 'jpg-to-sticker', label: 'JPG → Sticker', color: 'bg-green-100 text-green-700' },
          { value: 'image-to-pdf', label: 'Image → PDF', color: 'bg-purple-100 text-purple-700' }
        ].map(option => (
          <button
            key={option.value}
            onClick={() => setConversionType(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              conversionType === option.value
                ? option.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500">
          atau klik untuk memilih file (PDF, Word, JPG, PNG)
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Files ({files.length})</h4>
          {files.map(file => {
            const FileIcon = getFileIcon(file)
            return (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {file.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(file.status)}`}>
                        {Math.round(file.progress)}%
                      </span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Action Buttons */}
      {files.length > 0 && (
        <div className="flex justify-end space-x-3">
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </button>
          <button className="btn-primary">
            Process Files
          </button>
        </div>
      )}
    </div>
  )
}
