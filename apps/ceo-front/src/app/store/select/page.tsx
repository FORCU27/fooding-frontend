'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Store, storeApi } from '@repo/api/ceo';

import StoreSetupCard from './components/StoreSetupCard';

export default function StoreSelectPage() {
  const [storeName, setStoreName] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const handleCreateStore = async () => {
    if (!storeName.trim()) return;
    // TODO api 500 error 문의 후 연동 예정
  };

  useEffect(() => {
    const fetchStores = async () => {
      const res = await storeApi.getStores(); // 실제 API
      setStores(res.data);
      // const list = res.data;
      // setStores(
      //   list?.length ? list : (mockStoreListResponse.data.list ?? mockStoreListResponse.data),
      // );
    };
    fetchStores();
  }, []);

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
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={setSelectedStoreId}
        />
      </main>
    </div>
  );
}
