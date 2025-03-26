import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import axios from 'axios';

import { env } from '@/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${env.publicEnv.apiUrl}/auth/login`, {
      email: body.email,
      password: body.password,
    });

    // 비동기 방식으로 cookies() 호출
    const cookieStore = await cookies(); //await 추가
    // 쿠키 설정
    cookieStore.set({
      name: 'auth-token',
      value: response.data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // maxAge: 7 * 24 * 60 * 60, // 7일
    });

    // 토큰을 응답에 포함시켜 반환
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: '로그인에 실패했습니다.' }, { status: 401 });
  }
}
