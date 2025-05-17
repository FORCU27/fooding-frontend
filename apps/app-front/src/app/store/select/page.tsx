'use client';

import { useState } from 'react';

import { appApi } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

import StoreList from './components/StoreList';
import StoreOwnerProfile from './components/StoreOwnerProfile';

export default function StoreSelectPage() {
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: appApi.getUser });

  const stores = [
    '민서네 김밥 홍대점',
    '민서네 김밥 구월아시아드점',
    '민서네 김밥 을지로점',
    '민서네 김밥 강남점',
    '민서네 김밥 당산점',
    '민서네 김밥 월드컵점',
    '민서네 김밥 을지로입구점',
    '민서네 김밥 강남사거리점',
  ];
  const [selectedStore, setSelectedStore] = useState('민서네 김밥 구월아시아드점');
  return (
    <div className='flex h-screen font-sans'>
      <StoreOwnerProfile
        ownerName={user?.data.nickname}
        profileImageSrc={user?.data.profileImage}
      />
      <StoreList stores={stores} selectedStore={selectedStore} onSelectStore={setSelectedStore} />
    </div>
  );
}
