'use client';

import { Suspense } from 'react';

import { EmptyState, ErrorFallback, Skeleton } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps } from '@suspensive/react';

import { BookmarkList } from './components/BookmarkList';
import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

export const BookmarkListScreen: ActivityComponentType<'BookmarkListScreen'> = () => {
  return (
    <Screen header={<Header title='찜해둔 레스토랑' left={<Header.Back />} />}>
      <ErrorBoundary
        fallback={({ reset }: ErrorBoundaryFallbackProps) => (
          <ErrorFallback className='flex-1'>
            <ErrorFallback.Title>알 수 없는 에러가 발생했습니다</ErrorFallback.Title>
            <ErrorFallback.Description>잠시 후 다시 시도해 주세요</ErrorFallback.Description>
            <ErrorFallback.Actions>
              <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
            </ErrorFallback.Actions>
          </ErrorFallback>
        )}
      >
        <LoadingToggle fallback={<LoadingFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <BookmarkContent />
          </Suspense>
        </LoadingToggle>
      </ErrorBoundary>
    </Screen>
  );
};

const BookmarkContent = () => {
  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
  });

  if (stores.pageInfo.totalCount === 0) {
    return <EmptyState className='flex-1' title='북마크가 아무것도 없어요!' />;
  }

  return <BookmarkList stores={stores.list} />;
};

const LoadingFallback = () => {
  return (
    <div className='flex flex-col px-grid-margin'>
      <div className='flex gap-2 items-center pt-5'>
        <Skeleton shape='text' width={100} height={32} />
        <Skeleton shape='text' width={80} height={16} />
      </div>
      <div className='flex gap-2 items-center mt-2'>
        <Skeleton shape='text' width={60} height={14} />
        <Skeleton shape='text' width={60} height={14} />
      </div>
      <Skeleton shape='text' className='mt-2' width={20} height={14} />

      <div className='mt-4 flex justify-between -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={120} height={120} />
          </div>
        ))}
      </div>
      <div className='flex gap-2 items-center pt-15'>
        <Skeleton shape='text' width={100} height={32} />
        <Skeleton shape='text' width={80} height={16} />
      </div>
      <div className='flex gap-2 items-center mt-2'>
        <Skeleton shape='text' width={60} height={14} />
        <Skeleton shape='text' width={60} height={14} />
      </div>
      <Skeleton shape='text' className='mt-2' width={20} height={14} />

      <div className='mt-4 flex justify-between -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={120} height={120} />
          </div>
        ))}
      </div>
      <div className='flex gap-2 items-center pt-15'>
        <Skeleton shape='text' width={100} height={32} />
        <Skeleton shape='text' width={80} height={16} />
      </div>
      <div className='flex gap-2 items-center mt-2'>
        <Skeleton shape='text' width={60} height={14} />
        <Skeleton shape='text' width={60} height={14} />
      </div>
      <Skeleton shape='text' className='mt-2' width={20} height={14} />

      <div className='mt-4 flex justify-between -mx-grid-margin px-grid-margin'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <Skeleton width={120} height={120} />
          </div>
        ))}
      </div>
    </div>
  );
};
