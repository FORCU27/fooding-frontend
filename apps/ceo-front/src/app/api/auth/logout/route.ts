import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

export async function POST() {
  const cookieStore = await cookies();

  // 쿠키 삭제
  cookieStore.delete(STORAGE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(STORAGE_KEYS.SELECTED_STORE_ID);
  return NextResponse.json({ success: true });
}
