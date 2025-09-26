import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params
    
    if (!filename) {
      return NextResponse.json({
        success: false,
        error: 'Filename tidak ditemukan'
      }, { status: 400 })
    }

    // Forward to Python API
    const response = await fetch(`http://localhost:5000/api/download/${filename}`)
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'File tidak ditemukan'
      }, { status: 404 })
    }

    const fileBuffer = await response.arrayBuffer()
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Error in download API:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error downloading file'
    }, { status: 500 })
  }
}