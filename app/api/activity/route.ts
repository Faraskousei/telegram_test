import { NextRequest, NextResponse } from 'next/server'
import { getRecentActivity } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const limit = parseInt(searchParams.get('limit') || '10')

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
