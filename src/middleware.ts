import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log the request details
  console.log('Incoming request:', {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
  })

  // Add CORS headers
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
}

export const config = {
  matcher: '/api/:path*',
}
