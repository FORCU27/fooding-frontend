'use client';
export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { EmptyState, toast, Toaster } from '@repo/design-system/components/b2c';
import {
  Button,
  CoinProduct,
  SortOrder,
  SortToggle,
  Spinner,
} from '@repo/design-system/components/ceo';
import { useQueryClient } from '@tanstack/react-query';

import { useStore } from '@/context/StoreContext';
import { useActivateStorePointShopItem } from '@/hooks/store/useActivateStorePointShopItem';
import { useDeactivateStorePointShopItem } from '@/hooks/store/useDeactivateStorePointShopItem';
import { useGetStorePointShopList } from '@/hooks/store/useGetStorePointShopList';
import { formatDate } from '@/utils/date';

export interface StorePointShopItem {
  id: number;
  name: string;
  point: number;
  provideType: 'ALL' | 'REGULAR_CUSTOMER';
  conditions: string;
  isActive: boolean;
  totalQuantity: number;
  issuedQuantity: number;
  issueStartOn: string | null;
  issueEndOn: string | null;
  createdAt: string;
  image: {
    url: string;
  } | null;
}

export interface StorePointShopListResponse {
  list: StorePointShopItem[];
  totalCount: number;
}

const PointShopPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [sortOrder, setSortOrder] = useState<SortOrder>('RECENT');
  const { storeId } = useStore();
  const selectedStoreId = Number(storeId);

  const { data: pointshopList, isPending: activePending } = useGetStorePointShopList({
    storeId: selectedStoreId,
    sortType: sortOrder,
  });

  const activateMutation = useActivateStorePointShopItem(selectedStoreId);
  const deactivateMutation = useDeactivateStorePointShopItem(selectedStoreId);

  const [localActiveStates, setLocalActiveStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLocalActiveStates((prev) => {
      const next = { ...prev };

      [...(pointshopList?.list ?? [])].forEach((shop) => {
        // 서버에서 내려온 값이 있고, 아직 로컬에 optimistic update가 없는 경우에만 덮어쓰기
        if (next[shop.id] === undefined) {
          next[shop.id] = shop.isActive;
        }
      });

      return next;
    });
  }, [pointshopList?.list]);

  const handleSwitchChange = (id: number, prevIsActive: boolean) => (checked: boolean) => {
    // optimistic update
    setLocalActiveStates((prev) => ({
      ...prev,
      [id]: checked,
    }));

    const mutation = checked ? activateMutation : deactivateMutation;

    mutation.mutate(id, {
      onSuccess: () => {
        toast.success('상태 변경에 성공했습니다.');

        queryClient.setQueryData<StorePointShopListResponse>(
          ['storePointShopList', selectedStoreId, true, sortOrder],
          (old) => {
            if (!old) return old;
            return {
              ...old,
              list: old.list.filter((item: StorePointShopItem) => item.id !== id),
            };
          },
        );

        queryClient.setQueryData<StorePointShopListResponse>(
          ['storePointShopList', selectedStoreId, false, sortOrder],
          (old) => {
            if (!old) return old;
            return {
              ...old,
              list: old.list.filter((item: StorePointShopItem) => item.id !== id),
            };
          },
        );
      },
      onError: () => {
        toast.error('상태 변경에 실패했습니다.');

        setLocalActiveStates((prev) => ({
          ...prev,
          [id]: prevIsActive,
        }));
      },
    });
  };

  const isLoading = activePending || activateMutation.isPending || deactivateMutation.isPending;
  if (isLoading) {
    return (
      <div className='flex flex-col h-dvh w-full max-w-[1080px] gap-5'>
        <h1 className='headline-2'>포인트샵</h1>
        <Spinner size='lg' text='불러오는 중...' />
      </div>
    );
  }

  if (pointshopList?.list.length === 0) {
    return (
      <div className='flex flex-col h-dvh w-full max-w-[1080px] gap-5'>
        <h1 className='headline-2'>포인트샵</h1>
        <div className='flex flex-col gap-5 items-end'>
          <Button className='w-fit' onClick={() => router.push('/my/reward/pointshop/create')}>
            상품등록
          </Button>
          <SortToggle value={sortOrder} onSortChange={setSortOrder} />
        </div>

        <div className='flex flex-col w-full h-[690px] justify-center items-center bg-white rounded-3xl border border-gray-3'>
          <EmptyState title='아직 포인트샵이 없어요' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full max-w-[1080px]'>
      <h1 className='headline-2 mb-4'>포인트샵</h1>
      <div className='flex flex-col gap-3 items-end'>
        <Button className='w-fit' onClick={() => router.push('/my/reward/pointshop/create')}>
          상품등록
        </Button>
        <SortToggle value={sortOrder} onSortChange={setSortOrder} />
      </div>
      <div className='flex flex-col justify-center gap-5 py-5'>
        {pointshopList?.list.map((shop) => {
          const isCurrentlyActive = localActiveStates[shop.id] ?? shop.isActive;

          return (
            <CoinProduct
              className='hover:cursor-pointer'
              key={shop.id}
              canceledCount={shop.totalQuantity - shop.issuedQuantity}
              dateRange={
                shop.issueStartOn && shop.issueEndOn
                  ? `${shop.issueStartOn} ~ ${shop.issueEndOn}`
                  : undefined
              }
              exchangePoint={shop.point}
              imageAlt={shop.name}
              purchaseCount={shop.issuedQuantity}
              receivedCount={shop.totalQuantity}
              registrationDate={formatDate(shop.createdAt, { format: 'dot' }) || '-'}
              status={isCurrentlyActive ? '발급중' : '판매중지'}
              title={shop.name}
              usedCount={0}
              conditions={shop.conditions}
              image={shop.image?.url}
              isActive={isCurrentlyActive}
              onClick={() => router.push(`/my/reward/pointshop/${shop.id}`)}
              onSwitchChange={handleSwitchChange(shop.id, shop.isActive)}
            />
          );
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default PointShopPage;
