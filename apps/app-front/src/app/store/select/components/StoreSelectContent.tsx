'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Store } from '@repo/api/app';

import StoreList from './StoreList';
import StoreOwnerProfile from './StoreOwnerProfile';
import { setSelectedStoreId } from '@/services/locale';

interface StoreSelectContentProps {
  user: {
    nickname: string;
    profileImage: string | null;
  };
  stores: Store[];
}

export default function StoreSelectContent({ user, stores }: StoreSelectContentProps) {
  const router = useRouter();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  return (
    <div className='flex h-screen font-sans select-none'>
      <StoreOwnerProfile
        ownerName={user.nickname}
        profileImageSrc={user.profileImage ?? undefined}
      />
      <StoreList
        stores={stores}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        onSelectStoreId={setSelectedStoreId}
        onConfirm={() => {
          router.push(`/store/service-select`);
        }}
      />
    </div>
  );
}
