import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  // 쿠키 삭제
  cookieStore.set('accessToken', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // 즉시 만료
  });
  return NextResponse.json({ success: true });
}
