'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { EmptyState, toast, Toaster } from '@repo/design-system/components/b2c';
import { CoinProduct, Spinner } from '@repo/design-system/components/ceo';
import { useQueryClient } from '@tanstack/react-query';

import { StorePointShopItem } from '../page';
import { useStore } from '@/context/StoreContext';
import { useActivateStorePointShopItem } from '@/hooks/store/useActivateStorePointShopItem';
import { useDeactivateStorePointShopItem } from '@/hooks/store/useDeactivateStorePointShopItem';
import { useGetStorePointShopItem } from '@/hooks/store/useGetStorePointShopItem';
import { formatDate } from '@/utils/date';

const PointShopInfoPage = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const id = Number(params.id);
  const selectedStoreId = Number(storeId);

  const { data: pointShopItem, isPending } = useGetStorePointShopItem({
    storeId: selectedStoreId,
    id,
  });

  const activateMutation = useActivateStorePointShopItem(selectedStoreId);
  const deactivateMutation = useDeactivateStorePointShopItem(selectedStoreId);

  const [localIsActive, setLocalIsActive] = useState<boolean | null>(null);

  // 데이터 로드 후 초기 상태 설정
  useEffect(() => {
    if (pointShopItem) {
      setLocalIsActive(pointShopItem.isActive);
    }
  }, [pointShopItem]);

  const handleSwitchChange = (checked: boolean) => {
    if (!pointShopItem) return;

    setLocalIsActive(checked);

    const mutation = checked ? activateMutation : deactivateMutation;

    mutation.mutate(id, {
      onSuccess: () => {
        toast.success('상태 변경에 성공했습니다.');

        queryClient.setQueryData(
          ['storePointShopItem', selectedStoreId, id],
          (old: StorePointShopItem) => {
            if (!old) return old;
            return {
              ...old,
              isActive: checked,
            };
          },
        );
      },
      onError: () => {
        toast.error('상태 변경에 실패했습니다.');
        setLocalIsActive(pointShopItem.isActive);
      },
    });
  };

  if (isPending || localIsActive === null) {
    return (
      <div className='flex flex-col gap-8'>
        <p className='headline-2'>포인트 상품 상세</p>
        <Spinner size='lg' text='불러오는 중...' />
      </div>
    );
  }

  if (!pointShopItem) {
    return (
      <div className='flex flex-col gap-8'>
        <p className='headline-2'>포인트 상품 상세</p>
        <EmptyState title='상품 정보를 불러올 수 없습니다' />
      </div>
    );
  }

  const isActive = localIsActive ?? pointShopItem.isActive;

  return (
    <div className='flex flex-col gap-8'>
      <p className='headline-2'>포인트 상품 상세</p>
      {pointShopItem && (
        <CoinProduct
          className='border-fooding-purple'
          canceledCount={pointShopItem.totalQuantity - pointShopItem.issuedQuantity}
          exchangePoint={pointShopItem.point}
          imageAlt={pointShopItem.name}
          purchaseCount={pointShopItem.issuedQuantity}
          receivedCount={pointShopItem.totalQuantity}
          registrationDate={formatDate(pointShopItem.createdAt, { format: 'dot' }) || '-'}
          dateRange={
            pointShopItem.issueStartOn && pointShopItem.issueEndOn
              ? `${pointShopItem.issueStartOn} ~ ${pointShopItem.issueEndOn}`
              : undefined
          }
          status={pointShopItem.isActive ? '발급중' : '발급중지'}
          title={pointShopItem.name}
          usedCount={0}
          conditions={pointShopItem.conditions}
          image={pointShopItem.image?.url}
          onOrderClick={() => router.push(`/my/reward/pointshop/${id}/modify`)}
          isActive={isActive}
          onSwitchChange={handleSwitchChange}
        />
      )}

      <p className='headline-2'>포인트 사용 내역</p>
      <div className='bg-white min-h-[690px] flex justify-center items-center border border-gray-2 rounded-2xl mb-8'>
        <EmptyState title='포인트 사용 내역이 없습니다' />
      </div>
      <Toaster />
    </div>
  );
};

export default PointShopInfoPage;
