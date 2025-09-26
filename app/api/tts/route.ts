import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, language = 'id' } = body

    if (!text) {
      return NextResponse.json({
        success: false,
        error: 'Text tidak boleh kosong'
      }, { status: 400 })
    }

    // Forward to Python API
    const response = await fetch('http://localhost:5000/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, language })
    })

    if (!response.ok) {
      throw new Error('API server error')
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in TTS API:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error generating speech'
    }, { status: 500 })
  }
}
