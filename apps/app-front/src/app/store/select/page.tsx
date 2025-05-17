'use client';
import { useState } from 'react';

import StoreList from './components/StoreList';
import StoreOwnerProfile from './components/StoreOwnerProfile';

export default function StoreSelectPage() {
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
      <StoreOwnerProfile ownerName='김홍길' profileImageSrc='' />
      <StoreList stores={stores} selectedStore={selectedStore} onSelectStore={setSelectedStore} />
    </div>
  );
}
