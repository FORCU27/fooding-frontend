'use server';

import { cookies } from 'next/headers';

import { COOKIE_KEYS } from './cookies';
import { StoreServiceType } from '@/app/store/service-select/types';
import { Locale, defaultLocale } from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

export async function getSelectedStoreId() {
  return (await cookies()).get(COOKIE_KEYS.STORE_ID)?.value;
}

export async function setSelectedStoreId(storeId: string) {
  (await cookies()).set('selected_store_id', storeId);
}

export async function getSelectedService() {
  return (await cookies()).get('selected_service')?.value as StoreServiceType;
}

export async function setSelectedService(service: StoreServiceType) {
  (await cookies()).set(COOKIE_KEYS.SERVICE, service);
}
