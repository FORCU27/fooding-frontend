'use server';

import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  return cookieStore.set(key, value);
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || '';
}
