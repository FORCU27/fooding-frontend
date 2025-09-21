'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Store } from '@repo/api/ceo';
import { Button, RadioChoiceBox, DropdownMenu } from '@repo/design-system/components/ceo';
import { CirclePlusIcon, MoreVerticalIcon } from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { overlay } from 'overlay-kit';

import { StoreCreateDialog } from './_components/StoreCreateDialog';
import { StoreDeleteDialog } from './_components/StoreDeleteDialog';
import { StoreUpdateDialog } from './_components/StoreUpdateDialog';
import { FoodingLogo } from '@/components/FoodingLogo';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

// TODO: 매장이 많아졌을 때 UI 개선
// TODO: 최대 매장 수 초과 시 UI 개선
// TODO: 매장 이름 중복 시 UI 개선
// TODO: 매장 이름 인풋 최소, 최대 길이 제한

export default function StoreSelectPage() {
  return (
    <Suspense>
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
          <Suspense>
            <StoreSetupCard />
          </Suspense>
        </main>
      </div>
    </Suspense>
  );
}

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

  const onUpdateStoreButtonClick = ({ store }: { store: Store }) => {
    overlay.open(({ isOpen, close }) => (
      <StoreUpdateDialog store={store} isOpen={isOpen} onOpenChange={(open) => !open && close()} />
    ));
  };

  const onDeleteStoreButtonClick = (storeId: number) => {
    overlay.open(({ isOpen, close }) => (
      <StoreDeleteDialog
        storeId={storeId}
        isOpen={isOpen}
        onOpenChange={(open) => !open && close()}
      />
    ));
  };

  const title = '사장님을 위한 전용 공간에 오신 걸 환영합니다';

  return (
    <div
      className={cn(
        'bg-white p-[60px] text-center flex flex-col items-center w-full',
        'max-tablet:min-h-dvh',
        'tablet:shadow-lg tablet:rounded-[30px] tablet:max-w-[571px] tablet:my-5',
      )}
    >
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
                    <div key={store.id} className='relative'>
                      <RadioChoiceBox.Item value={store.id.toString()}>
                        {store.name}
                      </RadioChoiceBox.Item>
                      {/* TODO: 모바일 레이아웃에서 바텀 시트 표시 */}
                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <button className='absolute top-1/2 -translate-y-1/2 right-5 text-gray-5 cursor-pointer'>
                            <MoreVerticalIcon />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content side='left' align='start'>
                          <DropdownMenu.Item onClick={() => onUpdateStoreButtonClick({ store })}>
                            수정
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            variant='danger'
                            onClick={() => onDeleteStoreButtonClick(store.id)}
                          >
                            삭제
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>
                    </div>
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
    </div>
  );
};
