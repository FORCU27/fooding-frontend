'use client';

import { Suspense, useState } from 'react';

import { appApi, Store } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

import StoreList from './components/StoreList';
import StoreOwnerProfile from './components/StoreOwnerProfile';

export default function StoreSelectPage() {
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: appApi.getUser });
  const { data: stores } = useQuery({
    queryKey: ['stores', '홍길동', 1, 10],
    queryFn: () =>
      appApi.getStores({
        searchString: '홍길동',
        pageNum: 1,
        pageSize: 10,
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
        />
      </div>
    </Suspense>
  );
}
