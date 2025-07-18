import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

export enum AuthType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  GUEST = 'GUEST',
}

// 각 경로별 접근 권한 설정
export const pathConfig: Record<string, AuthType> = {
  '/mypage': AuthType.PRIVATE,
  '/login': AuthType.GUEST,
  '/': AuthType.PUBLIC,
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PUBLIC;
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  const isAuthenticated = !!token;

  if (authType === AuthType.PRIVATE && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  if (authType === AuthType.GUEST && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)'],
};
