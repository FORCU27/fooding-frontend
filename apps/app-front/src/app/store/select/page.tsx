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
  const { data: user } = useQuery({
    queryKey: [queryKeys.me.user],
    queryFn: () => userApi.getUser(),
  });
  const { data: stores } = useQuery({
    queryKey: [queryKeys.app.store.stores],
    queryFn: () => storeApi.getStores(),
  });

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  return (
    // TODO useQuery suspense 키는 거 확인
    <Suspense fallback={'fallback'}>
      <div className='flex h-screen font-sans'>
        <StoreOwnerProfile
          ownerName={user?.data.nickname as string}
          profileImageSrc={user?.data.profileImage as string}
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
