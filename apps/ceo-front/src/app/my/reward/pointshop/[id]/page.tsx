'use client';

import { useParams, useRouter } from 'next/navigation';

import { EmptyState } from '@repo/design-system/components/b2c';
import { CoinProduct } from '@repo/design-system/components/ceo';

import { useStore } from '@/context/StoreContext';
import { useGetStorePointShop } from '@/hooks/store/useGetStorePointShop';
import { formatDate } from '@/utils/date';

const PointShopInfoPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { storeId } = useStore();

  const { data: pointShopItem, isPending } = useGetStorePointShop({
    storeId,
    id,
    enabled: !!(storeId && id),
  });

  if (isPending) {
    return (
      <div className='flex items-center justify-center h-dvh'>
        <p className='body-2 text-gray-4'>불러오는 중...</p>
      </div>
    );
  }

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
          status={pointShopItem.isActive ? '발급중' : '발급중지'}
          title={pointShopItem.name}
          usedCount={0}
          conditions={pointShopItem.conditions}
          image={pointShopItem.image?.url}
          onOrderClick={() => router.push(`/my/reward/pointshop/${id}/modify`)}
        />
      )}

      <p className='headline-2'>포인트 사용 내역</p>
      <div className='bg-white min-h-[690px] flex justify-center items-center border border-gray-2 rounded-2xl mb-8'>
        <EmptyState title='포인트 사용 내역이 없습니다' />
      </div>
    </div>
  );
};

export default PointShopInfoPage;
