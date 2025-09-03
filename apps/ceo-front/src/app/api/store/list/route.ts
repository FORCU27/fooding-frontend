import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { storeApi } from '@repo/api/ceo';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { AxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  if (!accessToken)
    return NextResponse.json({ ok: false, message: 'no auth token' }, { status: 403 });

  try {
    const response = await storeApi.getStores({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(response);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(
        'GET /api/store/list failed:',
        e?.response?.status,
        e?.response?.data ?? e?.message,
      );
      return NextResponse.json(
        { ok: false, message: e?.message ?? 'fetch failed' },
        { status: 500 },
      );
    }

    // axios 외 예외 처리
    console.error('Unexpected error in /api/store/list:', e);
    return NextResponse.json({ ok: false, message: 'unexpected error' }, { status: 500 });
  }
}
