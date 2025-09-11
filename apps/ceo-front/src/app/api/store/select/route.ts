import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { storeApi } from '@repo/api/ceo';
import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import { AxiosError } from 'axios';

export async function POST(req: Request) {
  const { storeId } = await req.json();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STORAGE_KEYS.SELECTED_STORE_ID, String(storeId), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function GET() {
  const cookieStore = await cookies();

  const selectedStoreId = cookieStore.get(STORAGE_KEYS.SELECTED_STORE_ID)?.value;
  if (!selectedStoreId)
    return NextResponse.json({ ok: false, message: 'no selected store' }, { status: 204 });

  const accessToken = cookieStore.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  if (!accessToken)
    return NextResponse.json({ ok: false, message: 'no auth token' }, { status: 403 });

  try {
    const response = await storeApi.getStore(Number(selectedStoreId), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(response);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(
        'GET /api/store/select failed:',
        e.response?.status,
        e.response?.data ?? e.message,
      );
      return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
    }

    // axios 외 예외 처리
    console.error('Unexpected error in /api/store/select:', e);
    return NextResponse.json({ ok: false, message: 'unexpected error' }, { status: 500 });
  }
}
