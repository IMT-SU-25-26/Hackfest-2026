import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // Use getToken() - this is edge-compatible and reads the JWT
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // No valid token = not logged in
    if (!token) {
      console.log('🔐 No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check role from JWT token
    if (pathname.startsWith('/dashboard')) {
      if (token.role !== 'ADMIN') {
        console.log('🔐 User is not ADMIN, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Pass token data to server components via headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-team-id', token.team_id as string);
    requestHeaders.set('x-team-name', token.team_name as string);
    requestHeaders.set('x-team-role', token.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('🔐 Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
