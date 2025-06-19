'use client';

import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ErrorBoundary, ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { BookmarkList } from './components/BookmarkList';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

export const BookmarkListScreen = () => {
  return (
    <Screen header={<Header title='찜해둔 레스토랑' left={<Header.Back />} />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={BookmarkErrorFallback} onReset={reset}>
            <Suspense clientOnly>
              <BookmarkContent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Screen>
  );
};

const BookmarkContent = () => {
  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  return <BookmarkList items={stores?.data.list ?? []} />;
};

const BookmarkErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  return (
    <ErrorFallback className='flex-1'>
      <ErrorFallback.Title>레스토랑 목록을 불러오지 못했어요.</ErrorFallback.Title>
      <ErrorFallback.Actions>
        <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
      </ErrorFallback.Actions>
    </ErrorFallback>
  );
};
