'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Store, storeApi } from '@repo/api/ceo';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import StoreSetupCard from './components/StoreSetupCard';

async function fetchStores(): Promise<Store[]> {
  const res = await storeApi.getStores();
  return res.data;
}

export default function StoreSelectPage() {
  const router = useRouter();

  const [storeName, setStoreName] = useState<string>('');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const qc = useQueryClient();
  const {
    data: stores = [],
    isPending,
    isFetching,
  } = useQuery({ queryKey: ['stores'], queryFn: fetchStores });

  const createStore = useMutation({
    mutationFn: (name: string) => storeApi.createStore({ name }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['stores'] });
    },
  });

  const handleCreateStore = async () => {
    if (!storeName.trim()) return;
    createStore.mutateAsync(storeName.trim());
    setStoreName('');
  };

  const handleConfirmStore = async (id: number) => {
    console.log('handleConfirmStore', selectedStoreId);
    const res = await fetch('/api/store/select', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ storeId: id }),
    });

    if (!res.ok) {
      console.error('');
      return;
    }
    router.push('/my');
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
          onConfirm={handleConfirmStore}
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={setSelectedStoreId}
          isLoading={isPending || isFetching}
        />
      </main>
    </div>
  );
}
