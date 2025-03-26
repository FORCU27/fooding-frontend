import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // 비동기 방식으로 cookies() 호출
  const cookieStore = await cookies(); //await 추가
  // 쿠키 삭제
  cookieStore.delete('auth-token');
  return NextResponse.json({ success: true });
}
