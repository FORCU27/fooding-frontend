'use client';
import Image from 'next/image';
import { useState } from 'react';

// import { storeApi } from '@repo/api/ceo';

import StoreSetupCard from './components/StoreSetupCard';

export default function StoreSelectPage() {
  const [storeName, setStoreName] = useState('');

  const handleCreateStore = () => {
    // storeApi.createStore({ name: storeName }); // TODO api 500 error 문의 후 연동 예정
    console.log('매장 생성', storeName);
  };

  return (
    <div className='flex flex-col min-h-screen relative'>
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/images/main-illust.png'
          alt='메인 배경 일러스트'
          fill
          className='object-cover'
          priority
        />
      </div>
      <main className='flex-1 flex items-center justify-center'>
        <StoreSetupCard
          storeName={storeName}
          onChangeStoreName={setStoreName}
          onCreateStore={handleCreateStore}
        />
      </main>
    </div>
  );
}
