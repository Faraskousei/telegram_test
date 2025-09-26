import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    
    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query parameter is required'
      }, { status: 400 })
    }

    const youtubeApiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyDyrS8Hj0P4IDXw5llepPcEcWEAWEMhYuk'
    
    try {
      // Search YouTube for music videos
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' music')}&type=video&videoCategoryId=10&maxResults=10&key=${youtubeApiKey}`
      )
      
      if (!youtubeResponse.ok) {
        throw new Error(`YouTube API error: ${youtubeResponse.status}`)
      }
      
      const youtubeData = await youtubeResponse.json()
      
      const results = youtubeData.items.map((item: any, index: number) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        duration: 'Loading...', // Will be fetched separately
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        source: 'youtube',
        publishedAt: item.snippet.publishedAt
      }))

      return NextResponse.json({
        success: true,
        data: {
          query,
          results,
          total: results.length,
          source: 'youtube'
        }
      })
        } catch (youtubeError) {
          console.error('YouTube API error:', youtubeError)
          
          // Fallback to mock results if YouTube API fails
          const mockResults = [
            {
              id: '1',
              title: `${query} - Lofi Version`,
              artist: 'Lofi Artist',
              duration: '3:45',
              url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
              thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
              source: 'youtube'
            },
            {
              id: '2',
              title: `${query} - Chill Mix`,
              artist: 'Chill Artist',
              duration: '4:20',
              url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
              thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg',
              source: 'youtube'
            },
            {
              id: '3',
              title: `${query} - Relaxing Music`,
              artist: 'Relaxing Artist',
              duration: '5:30',
              url: 'https://www.youtube.com/watch?v=neV3Hr_b_18',
              thumbnail: 'https://img.youtube.com/vi/neV3Hr_b_18/maxresdefault.jpg',
              source: 'youtube'
            }
          ]

          return NextResponse.json({
            success: true,
            data: {
              query,
              results: mockResults,
              total: mockResults.length,
              source: 'mock',
              warning: 'Using mock data due to API error'
            }
          })
        }
  } catch (error) {
    console.error('Error searching music:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error searching music'
    }, { status: 500 })
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
