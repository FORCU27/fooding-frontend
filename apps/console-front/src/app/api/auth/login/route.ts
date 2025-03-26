import { NextResponse } from 'next/server';

import axios from 'axios';

import { env } from '@/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await axios.post(`${env.publicEnv.apiUrl}/auth/login`, {
      email,
      password,
    });

    // NextResponse를 사용하여 응답 생성
    const res = NextResponse.json(response.data, { status: 200 });
    // 쿠키 설정
    res.cookies.set('auth-token', response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // maxAge: 7 * 24 * 60 * 60, // 7일
    });
    // 설정된 응답 반환
    return res;
  } catch (error) {
    console.error('로그인 실패:', error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data.message || '로그인에 실패했습니다.' },
        { status: error.response.status || 401 },
      );
    }

    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
