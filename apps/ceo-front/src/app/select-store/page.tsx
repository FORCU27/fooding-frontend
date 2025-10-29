'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Store } from '@repo/api/ceo';
import { DropdownMenu } from '@repo/design-system/components/ceo';
import { Button, Dialog, Input, RadioChoiceBox } from '@repo/design-system/components/ceo';
import { CirclePlusIcon, MoreVerticalIcon } from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { overlay } from 'overlay-kit';

import { FoodingLogo } from '@/components/FoodingLogo';
import { useStore } from '@/context/StoreContext';
import { useCreateStore } from '@/hooks/store/useCreateStore';
import { useDeleteStore } from '@/hooks/store/useDeleteStore';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { useUpdateStore } from '@/hooks/store/useUpateStore';

// TODO: 매장이 많아졌을 때 UI 개선
// TODO: 최대 매장 수 초과 시 UI 개선
// TODO: 매장 이름 중복 시 UI 개선
// TODO: 매장 이름 인풋 최소, 최대 길이 제한

export default function StoreSelectPage() {
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
        <div
          className={cn(
            'bg-white p-[60px] text-center flex flex-col items-center w-full',
            'max-tablet:min-h-dvh',
            'tablet:shadow-lg tablet:rounded-[30px] tablet:max-w-[571px] tablet:my-5',
          )}
        >
          <Suspense clientOnly>
            <StoreSetupCard />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

const StoreSetupCard = () => {
  const { data: stores } = useGetStoreList();
  const { setStoreId } = useStore();
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

    if (selectedStoreId) {
      setStoreId(selectedStoreId);
    }

    router.push('/my');
  };

  const onCreateStoreButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <StoreCreateDialog isOpen={isOpen} onOpenChange={(open) => !open && close()} />
    ));
  };

  const onDelete = (storeId: string) => {
    if (selectedStoreId && selectedStoreId === storeId) {
      setSelectedStoreId(null);
    }
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
                    <div key={store.id} className='relative'>
                      <RadioChoiceBox.Item className='pr-10' value={store.id.toString()}>
                        {store.name}
                      </RadioChoiceBox.Item>
                      <MoreMenu store={store} onDelete={() => onDelete(store.id.toString())} />
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
    </>
  );
};

type StoreCreateDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const StoreCreateDialog = ({ isOpen, onOpenChange }: StoreCreateDialogProps) => {
  const [storeName, setStoreName] = useState('');

  const createStoreMutation = useCreateStore();

  const onConfirmButtonClick = () => {
    if (createStoreMutation.isPending) return;

    createStoreMutation.mutate(
      { name: storeName.trim() },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: () => {
          // TODO: 에러 처리
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>매장 등록</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Input
            placeholder='매장명을 입력해주세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            variant='primaryPink'
            onClick={onConfirmButtonClick}
            disabled={storeName.trim().length === 0}
          >
            등록
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

type MoreMenuProps = {
  store: Store;
  onDelete: () => void;
};

const MoreMenu = ({ store, onDelete }: MoreMenuProps) => {
  const onUpdateButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <StoreUpdateDialog isOpen={isOpen} onOpenChange={(open) => !open && close()} store={store} />
    ));
  };

  const onDeleteButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <StoreDeleteDialog
        isOpen={isOpen}
        onOpenChange={(open) => !open && close()}
        store={store}
        onDelete={onDelete}
      />
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className='text-gray-5 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer'>
        <MoreVerticalIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side='left' align='start'>
        <DropdownMenu.Item onClick={onUpdateButtonClick}>수정</DropdownMenu.Item>
        <DropdownMenu.Item variant='danger' onClick={onDeleteButtonClick}>
          삭제
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

type StoreUpdateDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  store: Store;
};

const StoreUpdateDialog = ({ isOpen, onOpenChange, store }: StoreUpdateDialogProps) => {
  const [storeName, setStoreName] = useState(store.name);

  const updateStoreMutation = useUpdateStore();

  const onConfirmButtonClick = () => {
    if (updateStoreMutation.isPending) return;

    updateStoreMutation.mutate(
      { id: store.id, body: store },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: () => {
          // TODO: 에러 처리
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>매장 수정</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Input
            placeholder='매장명을 입력해주세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            variant='primaryPink'
            onClick={onConfirmButtonClick}
            disabled={storeName.trim().length === 0}
          >
            수정
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

type StoreDeleteDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  store: {
    id: Store['id'];
  };
  onDelete: () => void;
};

const StoreDeleteDialog = ({ isOpen, onOpenChange, onDelete, store }: StoreDeleteDialogProps) => {
  const deleteStoreMutation = useDeleteStore();

  const onConfirmButtonClick = () => {
    if (deleteStoreMutation.isPending) return;

    deleteStoreMutation.mutate(store.id, {
      onSuccess: () => {
        onOpenChange(false);
        onDelete();
      },
      onError: () => {
        // TODO: 에러 처리
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>등록된 매장을 삭제하시겠습니까?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outlined'>취소</Button>
          </Dialog.Close>
          <Button onClick={onConfirmButtonClick}>삭제</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
