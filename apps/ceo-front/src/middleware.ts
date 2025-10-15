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
  '/': AuthType.PUBLIC,
  '/my': AuthType.PRIVATE,
  '/login': AuthType.GUEST,
  '/select-store': AuthType.PRIVATE,
};

const PUBLIC_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PRIVATE;
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  const isAuthenticated = !!token;

  // 선택된 매장 id 쿠키
  const selectedStoreId = request.cookies.get(STORAGE_KEYS.SELECTED_STORE_ID)?.value;

  if (!selectedStoreId) {
    return NextResponse.redirect('/store/select');
  }

  // NOTE: 로그인 필요 페이지에 접근 시 로그인 페이지로 이동
  if (!PUBLIC_ROUTES.includes(path)) {
    if (authType === AuthType.PRIVATE && !isAuthenticated) {
      const url = new URL('/login', request.url);
      url.searchParams.set('returnTo', path);
      return NextResponse.redirect(url);
    }
  }

  // NOTE: 비로그인 필요 시 메인 페이지로 이동
  if (authType === AuthType.GUEST && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // NOTE: 콘솔 페이지에 오면 로그인 페이지로 이동
  if (authType === AuthType.PUBLIC && path === '/self' && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  // 홈(/) 진입 시 매장 미선택이면 매장 선택 페이지로 이동
  if (isAuthenticated && path === '/my' && !selectedStoreId) {
    return NextResponse.redirect(new URL('/select-store', request.url));
  }

  // 이미 매장 선택된 상태에서 매장 선택 페이지로 들어오면 / 로 이동
  if (isAuthenticated && path === '/select-store' && selectedStoreId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)'],
};
