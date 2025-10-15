'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { EmptyState } from '@repo/design-system/components/b2c';
import { Button, CoinProduct, SortOrder, SortToggle } from '@repo/design-system/components/ceo';

import { useStore } from '@/context/StoreContext';
import { useGetStorePointShopList } from '@/hooks/store/useGetStorePointShopList';
import { formatDate } from '@/utils/date';

const PointShopPage = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<SortOrder>('RECENT');
  const { storeId } = useStore();

  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-dvh'>
          <p className='body-2 text-gray-4'>불러오는 중...</p>
        </div>
      }
    >
      <PointShopContent
        storeId={storeId}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        router={router}
      />
    </Suspense>
  );
};

interface PointShopContentProps {
  storeId: string;
  sortOrder: SortOrder;
  setSortOrder: (v: SortOrder) => void;
  router: ReturnType<typeof useRouter>;
}

const PointShopContent = ({ storeId, sortOrder, setSortOrder, router }: PointShopContentProps) => {
  const pointShopList = useGetStorePointShopList({ storeId, sortType: sortOrder });

  if (!pointShopList.data.list || pointShopList.data.list.length === 0) {
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
      <div className='flex flex-col justify-center gap-5 py-5 hover:cursor-pointer'>
        {pointShopList.data.list.map((shop) => (
          <div key={shop.id} onClick={() => router.push(`/my/reward/pointshop/${shop.id}`)}>
            <CoinProduct
              className='border-fooding-purple'
              canceledCount={shop.totalQuantity - shop.issuedQuantity}
              exchangePoint={shop.point}
              imageAlt={shop.name}
              purchaseCount={shop.issuedQuantity}
              receivedCount={shop.totalQuantity}
              registrationDate={formatDate(shop.createdAt, { format: 'dot' }) || '-'}
              status={shop.isActive ? '발급중' : '발급중지'}
              title={shop.name}
              usedCount={0}
              conditions={shop.conditions}
              image={shop.image?.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointShopPage;
