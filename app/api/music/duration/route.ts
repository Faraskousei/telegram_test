import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const videoId = searchParams.get('videoId')
    
    if (!videoId) {
      return NextResponse.json({
        success: false,
        error: 'Video ID parameter is required'
      }, { status: 400 })
    }

    const youtubeApiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyDyrS8Hj0P4IDXw5llepPcEcWEAWEMhYuk'
    
    try {
      // Get video details including duration
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${youtubeApiKey}`
      )
      
      if (!youtubeResponse.ok) {
        throw new Error(`YouTube API error: ${youtubeResponse.status}`)
      }
      
      const youtubeData = await youtubeResponse.json()
      
      if (youtubeData.items && youtubeData.items.length > 0) {
        const duration = youtubeData.items[0].contentDetails.duration
        const seconds = parseDuration(duration)
        
        return NextResponse.json({
          success: true,
          data: {
            videoId,
            duration: formatDuration(seconds),
            seconds
          }
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'Video not found'
        }, { status: 404 })
      }
    } catch (youtubeError) {
      console.error('YouTube API error:', youtubeError)
      
      return NextResponse.json({
        success: false,
        error: 'Error fetching video duration'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error getting video duration:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error getting video duration'
    }, { status: 500 })
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1]?.replace('H', '') || '0')
  const minutes = parseInt(match[2]?.replace('M', '') || '0')
  const seconds = parseInt(match[3]?.replace('S', '') || '0')
  
  return hours * 3600 + minutes * 60 + seconds
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
}
