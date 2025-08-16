import { NextResponse } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

export async function POST(req: Request) {
  const { storeId } = await req.json();

  const res = NextResponse.json({ ok: true });
  // 보안 쿠키로 저장 (httpOnly)
  res.cookies.set(STORAGE_KEYS.SELECTED_STORE_ID, String(storeId), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    // secure: true, // HTTPS 환경이면 키기
    maxAge: 60 * 60 * 24 * 30, // 30일
  });
  return res;
}
