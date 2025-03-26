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
  '/register': AuthType.GUEST,
  '/dashboard': AuthType.PRIVATE,
  '/profile': AuthType.PRIVATE,
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authType = pathConfig[path] || AuthType.PUBLIC;
  const token = request.cookies.get('auth-token');
  const isAuthenticated = !!token;

  // 인증이 필요한 페이지인데 토큰이 없는 경우에만 리다이렉트
  if (authType === AuthType.PRIVATE && !isAuthenticated) {
    const url = new URL('/login', request.url);

    url.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 게스트 전용 페이지(로그인, 회원가입 등)에 이미 인증된 사용자가 접근할 경우
  if (authType === AuthType.GUEST && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// export function middleware(request: NextRequest) {

//   console.log('test');

//   const path = request.nextUrl.pathname
//   const authType = pathConfig[path] || AuthType.PUBLIC
//   const token = request.cookies.get('auth-token')
//   const isAuthenticated = !!token

//   console.log('token', token);

//   switch (authType) {
//     case AuthType.PRIVATE:
//       if (!isAuthenticated) {
//         const url = new URL('/login', request.url)
//         url.searchParams.set('returnTo', request.nextUrl.pathname)
//         return NextResponse.redirect(url)
//       }
//       break

//     case AuthType.GUEST:
//       if (isAuthenticated) {
//         return NextResponse.redirect(new URL('/', request.url))
//       }
//       break
//   }

//   return NextResponse.next()
// }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
