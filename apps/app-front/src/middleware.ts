import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getCookie } from './utils/cookie';

export enum AuthType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  GUEST = 'GUEST',
}

// 각 경로별 접근 권한 설정
export const pathConfig: Record<string, AuthType> = {
  '/': AuthType.PUBLIC,
  '/login': AuthType.GUEST,
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PRIVATE;
  const token = await getCookie('accessToken');
  const isAuthenticated = token && token !== 'null' && token !== 'undefined';

  if (authType === AuthType.PRIVATE && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  if (authType === AuthType.GUEST && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authType === AuthType.PUBLIC && path === '/' && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)'],
};
