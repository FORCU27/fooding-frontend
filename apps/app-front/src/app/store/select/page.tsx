import { GetUserResponse, GetStoresResponse } from '@repo/api/app';

import StoreSelectContent from './components/StoreSelectContent';
import { serverFetch } from '@/services/server-api';

export default async function StoreSelectPage() {
  // 서버에서 데이터 가져오기 (인증 포함)
  const [userResponse, storesResponse] = await Promise.all([
    serverFetch<GetUserResponse>('/app/users'),
    serverFetch<GetStoresResponse>('/app/stores'),
  ]);

  return (
    <StoreSelectContent
      user={userResponse.data}
      stores={storesResponse.data}
    />
  );
}

