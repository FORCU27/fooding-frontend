import { cookies } from 'next/headers';

import { GetStoreServiceListResponse } from '@repo/api/app';

import ServiceSelectContent from './components/ServiceSelectContent';
import { COOKIE_KEYS } from '@/services/cookies';
import { serverFetch } from '@/services/server-api';

export default async function ServiceSelectPage() {
  const cookieStore = await cookies();
  const storeId = cookieStore.get(COOKIE_KEYS.STORE_ID)?.value;

  if (!storeId) {
    throw new Error('Store ID not found');
  }

  const storeServiceList = await serverFetch<GetStoreServiceListResponse>(
    `/app/store-service/${storeId}`,
  );

  return <ServiceSelectContent storeServiceList={storeServiceList.data} />;
}

