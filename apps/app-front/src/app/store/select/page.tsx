'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { userApi, storeApi, Store } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

import StoreList from './components/StoreList';
import StoreOwnerProfile from './components/StoreOwnerProfile';
import { setSelectedStoreId } from '@/services/locale';

export default function StoreSelectPage() {
  const router = useRouter();
  const { data: user, error: userError } = useQuery({
    queryKey: [queryKeys.me.user],
    queryFn: userApi.getUser,
  });

  console.log('user data:', user); // API 응답 데이터 확인
  console.log('user error:', userError); // 에러 확인

  const { data: stores, error: storesError } = useQuery({
    queryKey: [queryKeys.store.stores],
    queryFn: () => storeApi.getStores(),
  });

  console.log('stores data:', stores); // API 응답 데이터 확인
  console.log('stores error:', storesError); // 에러 확인

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  return (
    // TODO useQuery suspense 키는 거 확인
    <Suspense fallback={'fallback'}>
      <div className='flex h-screen font-sans'>
        <StoreOwnerProfile
          ownerName={user?.data.nickname}
          profileImageSrc={user?.data.profileImage ?? ''}
        />
        <StoreList
          stores={stores?.data}
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
          onSelectStoreId={setSelectedStoreId}
          onConfirm={() => {
            router.push(`/store/service-select`);
          }}
        />
      </div>
    </Suspense>
  );
}
