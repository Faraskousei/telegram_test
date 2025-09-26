import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const conversionType = formData.get('type') as string || 'auto'

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'Tidak ada file yang diupload'
      }, { status: 400 })
    }

    // Forward to Python API
    const apiFormData = new FormData()
    apiFormData.append('file', file)
    apiFormData.append('type', conversionType)

    const response = await fetch('http://localhost:5000/api/convert', {
      method: 'POST',
      body: apiFormData
    })

    if (!response.ok) {
      throw new Error('API server error')
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in convert API:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error processing file conversion'
    }, { status: 500 })
  }
}
