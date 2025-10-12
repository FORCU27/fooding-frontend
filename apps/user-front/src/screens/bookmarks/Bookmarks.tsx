'use client';

import { Suspense } from 'react';

import { EmptyState } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { StoreListItem } from '@/components/Store/StoreListItem';
import { useGetBookmarkList } from '@/hooks/bookmark/useGetBookmarkList';

export const BookmarkListScreen: ActivityComponentType<'BookmarkListScreen'> = () => {
  return (
    <Screen header={<Header title='찜해 둔 레스토랑' left={<Header.Back />} />}>
      <DefaultErrorBoundary>
        <LoadingToggle fallback={<LoadingFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <BookmarkContent />
          </Suspense>
        </LoadingToggle>
      </DefaultErrorBoundary>
    </Screen>
  );
};

const BookmarkContent = () => {
  const { data: bookmarks } = useGetBookmarkList({
    pageNum: 1,
    pageSize: 100,
  });

  if (bookmarks.list.length === 0) {
    return <EmptyState className='flex-1' title='북마크가 아무것도 없어요!' />;
  }

  return (
    <ul className='px-grid-margin flex flex-col divide-y divide-gray-2'>
      {bookmarks.list.map((bookmark) => (
        <StoreListItem
          key={bookmark.id}
          store={{
            address: '제주 제주시 서해안로 654', // TODO: address 추가
            category: 'ASIAN', // TODO: category 추가
            averageRating: bookmark.averageRating,
            estimatedWaitingTimeMinutes: bookmark.estimatedWaitingTimeMinutes,
            id: bookmark.id,
            images: bookmark.images,
            isBookmarked: true,
            name: bookmark.name,
            reviewCount: bookmark.reviewCount,
            isFinished: bookmark.isFinished,
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
