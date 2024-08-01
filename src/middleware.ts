import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken');

  if (!authToken) {
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/create'],
};
