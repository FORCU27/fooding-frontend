import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // 비동기 방식으로 cookies() 호출
  const cookieStore = await cookies(); //await 추가

  // 쿠키 삭제
  // cookieStore.delete('auth-token');
  cookieStore.set('auth-token', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // 즉시 만료
  });
  return NextResponse.json({ success: true });
}
