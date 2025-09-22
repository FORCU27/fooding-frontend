'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, RadioChoiceBox } from '@repo/design-system/components/ceo';
import { CirclePlusIcon } from '@repo/design-system/icons';
import { overlay } from 'overlay-kit';

import StoreCreateDialog from './StoreCreateDialog';
import { FoodingLogo } from '@/components/FoodingLogo';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

const StoreSetupCard = () => {
  const { data: stores } = useGetStoreList();

  const router = useRouter();

  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const onStoreSelect = async () => {
    const res = await fetch('/api/store/select', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ storeId: selectedStoreId }),
    });

    if (!res.ok) {
      console.error('');
      return;
    }
    router.push('/my');
  };

  const onCreateStoreButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <StoreCreateDialog isOpen={isOpen} onOpenChange={(open) => !open && close()} />
    ));
  };

  const title = '사장님을 위한 전용 공간에 오신 걸 환영합니다';

  return (
    <>
      <FoodingLogo />
      <h1 className='font-semibold tablet:text-[24px] text-center pt-[12px]'>{title}</h1>
      <div className='py-[32px] flex flex-col items-center w-full'>
        <hr className='w-full border border-black/10' />
        {stores.length === 0 && (
          <button
            className='flex flex-col items-center justify-center py-[80px] cursor-pointer'
            onClick={onCreateStoreButtonClick}
            type='button'
          >
            <CirclePlusIcon />
            <p className='mt-2 body-2'>관리할 매장을 등록해주세요.</p>
          </button>
        )}
        {stores.length > 0 && (
          <>
            <div className='w-full py-[32px]'>
              <div
                className='w-full flex flex-col gap-[16px]'
                role='radiogroup'
                aria-label='매장 선택'
              >
                <RadioChoiceBox value={selectedStoreId} onValueChange={setSelectedStoreId}>
                  {stores.map((store) => (
                    <RadioChoiceBox.Item key={store.id} value={store.id.toString()}>
                      {store.name}
                    </RadioChoiceBox.Item>
                  ))}
                </RadioChoiceBox>
              </div>
            </div>
          </>
        )}
        <hr className='w-full border border-black/10' />
      </div>
      <Button
        size='large'
        variant='primaryPink'
        rounded
        className='w-full'
        onClick={onStoreSelect}
        disabled={selectedStoreId === null}
      >
        매장 선택하기
      </Button>
      <Button
        size='large'
        variant='outlined'
        rounded
        className='mt-4 w-full border-primary-pink text-primary-pink hover:bg-primary-pink/5'
        onClick={onCreateStoreButtonClick}
      >
        매장 생성하기
      </Button>
    </>
  );
};

export default StoreSetupCard;
