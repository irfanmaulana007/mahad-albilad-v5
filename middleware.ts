import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Add CORS headers for API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      const response = NextResponse.next()
      response.headers.append('Access-Control-Allow-Credentials', 'true')
      return response
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/login',
    },
  },
)

// Protect all routes under /admin and /api
export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
