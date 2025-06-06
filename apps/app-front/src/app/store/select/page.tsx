'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { userApi, storeApi, Store } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

import StoreList from './components/StoreList';
import StoreOwnerProfile from './components/StoreOwnerProfile';
import { setSelectedStoreId } from '@/services/locale';

export default function StoreSelectPage() {
  const router = useRouter();
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: userApi.getUser });
  const { data: stores } = useQuery({
    queryKey: ['stores', '홍길동', 1, 20],
    queryFn: () =>
      storeApi.getStores({
        searchString: '홍길동',
        pageNum: 1,
        pageSize: 20,
      }),
  });

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  return (
    // TODO useQuery suspense 키는 거 확인
    <Suspense fallback={'fallback'}>
      <div className='flex h-screen font-sans'>
        <StoreOwnerProfile
          ownerName={user?.data.nickname}
          profileImageSrc={user?.data.profileImage}
        />
        <StoreList
          stores={stores?.list}
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
