import { NextResponse, NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
//   console.log('Middleware triggered for path:', path);
  const isPublic = path === '/login' || path === '/signup' || path === '/verifyEmail'|| path === 'verifyForgotPasswordToken';

  const token = request.cookies.get('token')?.value || '';
  if(isPublic && token) {
    // If the user is logged in and tries to access a public page, redirect to profile
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if(!isPublic && !token) {
    // If the user is not logged in and tries to access a protected page, redirect to login
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyEmail',
    '/verifyForgotPasswordToken',
  ],
}