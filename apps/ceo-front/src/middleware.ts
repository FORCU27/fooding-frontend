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
  '/': AuthType.PUBLIC, // fix: PRIVATE 지정
  '/login': AuthType.GUEST,
  '/store/select': AuthType.PUBLIC, // fix: PRIVATE 지정
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PRIVATE;
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  const isAuthenticated = !!token;

  // 선택된 매장 id 쿠키
  const selectedStoreId = request.cookies.get(STORAGE_KEYS.SELECTED_STORE_ID)?.value;

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

  // 홈(/) 진입 시 매장 미선택이면 /store/select로 이동
  if (isAuthenticated && path === '/' && !selectedStoreId) {
    return NextResponse.redirect(new URL('/store/select', request.url));
  }

  // 이미 매장 선택된 상태에서 /store/select 들어오면 / 로 이동
  if (isAuthenticated && path === '/store/select' && selectedStoreId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)'],
};
