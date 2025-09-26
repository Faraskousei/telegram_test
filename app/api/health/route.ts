import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if API server is running
    const apiResponse = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const apiData = await apiResponse.json()

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        web: 'running',
        api: apiResponse.ok ? 'running' : 'error',
        database: 'connected'
      },
      version: '1.0.0'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'API server tidak dapat diakses',
      services: {
        web: 'running',
        api: 'error',
        database: 'unknown'
      }
    }, { status: 500 })
  }
}
