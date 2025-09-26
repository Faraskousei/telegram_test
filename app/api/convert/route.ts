import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const conversionType = formData.get('type') as string || 'pdf-to-word'

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'Tidak ada file yang diupload'
      }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: 'Tipe file tidak didukung'
      }, { status: 400 })
    }

    // Simulate file processing (replace with actual conversion logic)
    const fileName = file.name
    const fileExtension = fileName.split('.').pop()?.toLowerCase()
    
    let convertedFileName = ''
    let downloadUrl = ''

    // Generate mock conversion result
    switch (conversionType) {
      case 'pdf-to-word':
        convertedFileName = fileName.replace(/\.pdf$/i, '.docx')
        downloadUrl = `/api/download/${convertedFileName}`
        break
      case 'word-to-pdf':
        convertedFileName = fileName.replace(/\.(docx?|doc)$/i, '.pdf')
        downloadUrl = `/api/download/${convertedFileName}`
        break
      case 'jpg-to-sticker':
        convertedFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '_sticker.webp')
        downloadUrl = `/api/download/${convertedFileName}`
        break
      case 'image-to-pdf':
        convertedFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.pdf')
        downloadUrl = `/api/download/${convertedFileName}`
        break
      default:
        convertedFileName = fileName
        downloadUrl = `/api/download/${convertedFileName}`
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      message: 'File berhasil dikonversi',
      data: {
        original_file: fileName,
        converted_file: convertedFileName,
        download_url: downloadUrl,
        conversion_type: conversionType,
        file_size: file.size,
        processed_at: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error in convert API:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error processing file conversion'
    }, { status: 500 })
  }
}
