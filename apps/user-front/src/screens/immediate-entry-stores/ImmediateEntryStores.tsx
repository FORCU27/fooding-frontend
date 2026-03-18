import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { StoreListItem } from '@/components/Store/StoreListItem';
import { useGetStoreImmediateEntryList } from '@/hooks/store/useGetStoreImmediateEntryList';

export const ImmediateEntryStoreListScreen: ActivityComponentType<
  'ImmediateEntryStoreListScreen'
> = () => {
  return (
    <Screen header={<Header title='입장 가능 식당' left={<Header.Back />} />}>
      <DefaultErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <ImmediateEntryStoreList />
        </Suspense>
      </DefaultErrorBoundary>
    </Screen>
  );
};

const ImmediateEntryStoreList = () => {
  const { data: immediateEntryStores } = useGetStoreImmediateEntryList();

  return (
    <ul className='px-grid-margin flex flex-col divide-y divide-gray-2'>
      {immediateEntryStores.list.map((store) => (
        <StoreListItem
          key={store.id}
          hasBookMarkButton={false}
          store={{
            address: store?.address || '주소정보없음',
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
