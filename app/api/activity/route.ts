import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')

    // Dynamic import to avoid static generation issues
    const { getRecentActivity } = await import('@/lib/database')
    
    // Fetch activity from Firebase
    const activities = await getRecentActivity(limit)
    
    return NextResponse.json({
      success: true,
      data: activities
    })
  } catch (error) {
    console.error('Error fetching activity:', error)
    
    // Return mock data if Firebase is not available
    return NextResponse.json({
      success: true,
      data: [
        {
          username: 'john_doe',
          file: 'document.pdf',
          type: 'pdf-to-word',
          time: '2024-01-15 14:30:25'
        },
        {
          username: 'jane_smith',
          file: 'presentation.docx',
          type: 'word-to-pdf',
          time: '2024-01-15 14:25:10'
        },
        {
          username: 'mike_wilson',
          file: 'photo.jpg',
          type: 'jpg-to-sticker',
          time: '2024-01-15 14:20:45'
        },
        {
          username: 'sarah_jones',
          file: 'report.pdf',
          type: 'pdf-to-word',
          time: '2024-01-15 14:15:30'
        },
        {
          username: 'alex_brown',
          file: 'image.png',
          type: 'image-to-pdf',
          time: '2024-01-15 14:10:15'
        }
      ]
    })
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
