import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export enum AuthType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  GUEST = 'GUEST',
}

// 각 경로별 접근 권한 설정
export const pathConfig: Record<string, AuthType> = {
  '/': AuthType.PRIVATE,
  '/about': AuthType.PUBLIC,
  '/login': AuthType.GUEST,
  '/join': AuthType.GUEST,
  '/dashboard': AuthType.PRIVATE,
  '/profile': AuthType.PRIVATE,
  '/reset-password': AuthType.GUEST,
  '/reset-password/request': AuthType.PUBLIC,
  '/reset-password/confirm': AuthType.PUBLIC,
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PUBLIC;
  const token = request.cookies.get('auth-token');
  const isAuthenticated = !!token;

  switch (authType) {
    case AuthType.PRIVATE:
      if (!isAuthenticated) {
        const url = new URL('/login', request.url);
        url.searchParams.set('returnTo', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      break;

    case AuthType.GUEST:
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      break;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
