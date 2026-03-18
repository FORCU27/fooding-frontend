'use server';

import { cookies } from 'next/headers';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 서버 사이드에서 인증된 API 요청을 위한 fetch 헬퍼
 * next/headers의 cookies()를 사용하여 토큰을 읽음
 */
export async function serverFetch<T>(endpoint: string): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  // URL 조합 시 중복 슬래시 방지
  const baseUrl = BASE_URL?.replace(/\/$/, ''); // 끝의 슬래시 제거
  const url = `${baseUrl}${endpoint}`;

  console.log('[SSR Fetch] URL:', url);
  console.log('[SSR Fetch] Has Token:', !!accessToken);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: 'no-store', // SSR에서 항상 최신 데이터
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[SSR Fetch] Error Status:', response.status);
    console.error('[SSR Fetch] Error StatusText:', response.statusText);
    console.error('[SSR Fetch] Error Body:', errorBody);
    throw new Error(`API Error: ${response.status} - ${errorBody}`);
  }

  return response.json();
}
