import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { StoreListItem } from '@/components/Store/StoreListItem';
import { useGetRecentlyViewedStoreList } from '@/hooks/store/useGetRecentlyViewedStoreList';

export const RecentlyViewedStoreListScreen: ActivityComponentType<
  'RecentlyViewedStoreListScreen'
> = () => {
  return (
    <Screen header={<Header title='최근 본 식당' left={<Header.Back />} />}>
      <DefaultErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <RecentlyViewedStoreList />
        </Suspense>
      </DefaultErrorBoundary>
    </Screen>
  );
};

const RecentlyViewedStoreList = () => {
  const { data: recentlyViewedStores } = useGetRecentlyViewedStoreList();

  return (
    <ul className='px-grid-margin flex flex-col divide-y divide-gray-2'>
      {recentlyViewedStores.list.map((store) => (
        <StoreListItem
          key={store.id}
          store={{
            address: '제주 제주시 서해안로 654', // TODO: address 추가
            averageRating: store.averageRating,
            category: store.category,
            estimatedWaitingTimeMinutes: store.estimatedWaitingTimeMinutes,
            id: store.id,
            images: store.images,
            isBookmarked: store.isBookmarked,
            name: store.name,
            reviewCount: store.reviewCount,
            isFinished: store.isFinished,
          }}
        />
      ))}
    </ul>
  );
};

const LoadingFallback = () => {
  return (
    <div className='flex flex-col px-grid-margin gap-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <StoreListItem.Skeleton key={index} />
      ))}
    </div>
  );
};
