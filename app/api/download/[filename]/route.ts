import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    if (!filename) {
      return NextResponse.json({
        success: false,
        error: 'Filename tidak ditemukan'
      }, { status: 400 })
    }

    // Simulate file download (replace with actual file serving logic)
    const mockFileContent = `Mock converted file: ${filename}`
    const buffer = Buffer.from(mockFileContent, 'utf-8')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString()
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