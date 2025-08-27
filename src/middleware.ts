import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the current URL
  const url = request.nextUrl.clone()
  
  // Skip processing for Next.js internal requests (RSC, etc.)
  const isNextInternalRequest = 
    url.searchParams.has('_rsc') ||
    request.headers.get('RSC') === '1' ||
    request.headers.get('Next-Router-Prefetch') === '1'
  
  if (isNextInternalRequest) {
    return NextResponse.next()
  }
  
  // Ensure we're using the correct domain  
  if (request.headers.get('host')?.includes('prokr.sa')) {
    url.host = 'www.prokr.net'
    return NextResponse.redirect(url)
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/webpack-hmr (webpack hot reloading)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)',
  ],
}
