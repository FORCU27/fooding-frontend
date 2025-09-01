import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { authApi } from '@repo/api/auth';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { AxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  if (!accessToken)
    return NextResponse.json({ ok: false, message: 'no auth token' }, { status: 403 });

  try {
    const response = await authApi.getSelf({ headers: { Authorization: `Bearer ${accessToken}` } });
    return NextResponse.json(response);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(
        'GET /api/auth/me failed:',
        e.response?.status,
        e.response?.data ?? e.message,
      );
      return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
    }

    // axios 외 예외 처리
    console.error('Unexpected error in /api/auth/me:', e);
    return NextResponse.json({ ok: false, message: 'unexpected error' }, { status: 500 });
  }
}
