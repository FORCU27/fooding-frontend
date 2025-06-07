import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(STORAGE_KEYS.ACCESS_TOKEN);

  return NextResponse.json({ success: true });
}
