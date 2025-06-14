import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

export enum AuthType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  GUEST = 'GUEST',
}

// 가게 선택이 필요하지 않은 경로 목록
const STORE_SELECTION_EXCLUDED_PATHS = ['/store/select', '/store/service-select', '/login'];

// 각 경로별 접근 권한 설정
export const pathConfig: Record<string, AuthType> = {
  '/': AuthType.PUBLIC,
  '/login': AuthType.GUEST,
  '/store/select': AuthType.PUBLIC,
  '/store/service-select': AuthType.PUBLIC,
  '/store/waiting': AuthType.PUBLIC,
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PRIVATE;
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  const isAuthenticated = !!token;
  const storeId = request.cookies.get('selected_store_id');

  // 1. 로그인 체크 (가장 먼저)
  if (!isAuthenticated && path !== '/login') {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  // 2. 게스트 페이지 접근 제한
  if (authType === AuthType.GUEST && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. 메인 페이지 접근 제한
  if (authType === AuthType.PUBLIC && path === '/' && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  // 4. 가게 선택 체크
  // 제외된 경로가 아니고, 가게가 선택되지 않은 경우
  if (
    !STORE_SELECTION_EXCLUDED_PATHS.some((excludedPath) => path.startsWith(excludedPath)) &&
    !storeId
  ) {
    const url = new URL('/store/select', request.url);
    url.searchParams.set('returnTo', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)'],
};
