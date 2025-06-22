'use client';

import { Button } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { BookmarkList } from './components/BookmarkList';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

export const BookmarkListScreen: ActivityComponentType<'BookmarkListScreen'> = () => {
  return (
    <Screen header={<Header title='찜해둔 레스토랑' left={<Header.Back />} />}>
      <BookmarkContent />
    </Screen>
  );
};

const BookmarkContent = () => {
  const {
    data: stores,
    isPending,
    isError,
    refetch,
  } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !stores) {
    return <ErrorState onRetry={refetch} isLoading={isPending} />;
  }

  if (stores.data.pageInfo.totalCount === 0) {
    return <EmptyState />;
  }

  return <BookmarkList items={stores?.data.list ?? []} />;
};

const ErrorState = ({ onRetry, isLoading }: { onRetry: () => void; isLoading: boolean }) => (
  <div className='flex-1'>
    <div className='flex flex-col justify-center items-center gap-2'>
      <span className='text-black font-semibold text-lg text-center'>
        레스토랑 목록을 불러오지 못했어요.
      </span>
    </div>
    <div className='mt-2 flex gap-3 justify-center items-center'>
      <Button size='banner' onClick={onRetry} disabled={isLoading}>
        {isLoading ? '불러오는 중...' : '새로고침'}
      </Button>
    </div>
  </div>
);

const EmptyState = () => {
  return (
    <div className='flex justify-center items-center h-[560px]'>
      <p className='text-gray-3'>찜해둔 레스토랑이 없어요.</p>
    </div>
  );
};

const LoadingState = () => (
  <div className='flex justify-center items-center h-[560px]'>
    <p className='text-gray-2'>로딩 중...</p>
  </div>
);
