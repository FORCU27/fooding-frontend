import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

// 현재 선택된 store ID를 가져오는 API
export async function GET() {
  try {
    const cookieStore = await cookies();
    const selectedStoreId = cookieStore.get(STORAGE_KEYS.SELECTED_STORE_ID);

    return NextResponse.json({
      storeId: selectedStoreId?.value ? Number(selectedStoreId.value) : null,
    });
  } catch (error) {
    console.error('Failed to get selected store ID:', error);
    return NextResponse.json({ storeId: null }, { status: 500 });
  }
}
