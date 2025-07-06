'use client';

import { Bookmark } from '@repo/api/user';
import { Button, ErrorFallback, Skeleton } from '@repo/design-system/components/b2c';
import {
  ChevronRightIcon,
  FoodingIcon,
  GiftIcon,
  MessageDotsSquareIcon,
  SettingIcon,
  TicketIcon,
} from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { ErrorBoundary, ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';

import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { StoresList } from '@/components/Store/StoresList';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { useGetBookmarkList } from '@/hooks/user/useGetBookmarkList';
import { BookmarkCard } from '@/screens/bookmarks/components/BookmarkCard';

export const MyPageTab: ActivityComponentType<'MyPageTab'> = () => {
  const flow = useFlow();

  return (
    <Screen
      header={
        <Header
          title='마이페이지'
          right={
            <SettingIcon
              className='cursor-pointer'
              onClick={() => flow.push('SettingScreen', {})}
            />
          }
        />
      }
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <ErrorBoundary fallback={MyPageErrorFallback}>
        <LoadingToggle fallback={<MyPageLoadingFallback />}>
          <Suspense fallback={null}>
            <Content />
          </Suspense>
        </LoadingToggle>
      </ErrorBoundary>
    </Screen>
  );
};

const Content = () => {
  const { user } = useAuth();
  const flow = useFlow();

  const { data: bookmarks } = useGetBookmarkList({
    pageNum: 1,
    pageSize: 3,
  });
  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 3,
  });

  return (
    <div className='w-full'>
      <div className='flex-col bg-white/80 pb-5 py-grid-margin'>
        <div className='flex justify-between px-grid-margin'>
          <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center w-[64px] h-[64px] bg-gray-1 rounded-full'>
              <FoodingIcon fillOpacity={0.1} />
            </div>
            <div className='flex flex-col mx-5 justify-center items-center w-[100px]'>
              <p className='subtitle-4 mb-2'>{user?.nickname ? user?.nickname : user?.email}</p>
              <div className='flex justify-between w-full'>
                <p className='text-gray-5 body-8'>팔로워 0</p>
                <hr className='w-[1px] h-[14px] bg-gray-2 text-gray-2' />
                <p className='text-gray-5 body-8'>팔로잉 0</p>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <Button size='small' variant='outlined' className='w-[96px]'>
              프로필 수정
            </Button>
          </div>
        </div>
        <div className='flex justify-around items-center h-[88px] mt-5 p-5'>
          <div className='flex flex-col justify-center items-center gap-1 cursor-pointer'>
            <MessageDotsSquareIcon />
            <p className='body-7 text-gray-5'>내 리뷰</p>
            <p className='subtitle-6'>5건</p>
          </div>
          <hr className='w-[2px] h-[81px] bg-gray-2 text-gray-2 mx-2' />
          <div className='flex flex-col justify-center items-center gap-1 cursor-pointer'>
            <TicketIcon />
            <p className='body-7 text-gray-5'>쿠폰</p>
            <p className='subtitle-6'>3장</p>
          </div>
          <hr className='w-[2px] h-[81px] bg-gray-2 text-gray-2 mx-2' />
          <div className='flex flex-col justify-center items-center gap-1 cursor-pointer'>
            <GiftIcon />
            <p className='body-7 text-gray-5'>포인트 적립</p>
            <p className='subtitle-6'>5건</p>
          </div>
        </div>
      </div>
      {stores && (
        <div className='mt-3'>
          <div className='flex flex-col py-grid-margin bg-white/80'>
            <div className='flex justify-between mb-4 px-grid-margin'>
              <div className='subtitle-3'>찜해 둔 식당</div>
              {(bookmarks?.list.length ?? 0) === 0 ? (
                <button
                  className='flex justify-center items-center body-5 text-gray-3'
                  onClick={() => flow.push('BookmarkListScreen', {})}
                  disabled
                >
                  <span>전체보기</span>
                  <ChevronRightIcon size={14} />
                </button>
              ) : (
                <button
                  className='flex justify-center items-center body-5 text-gray-5 cursor-pointer hover:text-black'
                  onClick={() => flow.push('BookmarkListScreen', {})}
                >
                  <span>전체보기</span>
                  <ChevronRightIcon size={14} />
                </button>
              )}
            </div>
            <ul className='flex px-grid-margin overflow-x-auto scrollbar-hide w-dvw justify-between gap-3'>
              {bookmarks?.list.map((bookmark: Bookmark) => (
                <BookmarkCard bookmark={bookmark} key={bookmark.id} />
              ))}
            </ul>
          </div>

          <StoresList
            stores={stores.list}
            subtitle='최근 본 식당'
            onClickTotalBtn={() => flow.push('MyPageTab', {})}
          />
        </div>
      )}
    </div>
  );
};

const MyPageLoadingFallback = () => {
  return (
    <div className='px-grid-margin py-grid-margin'>
      <div className='flex gap-2'>
        <Skeleton shape='circle' width={64} height={64} />
        <div>
          <Skeleton shape='text' className='mt-2' width={80} height={24} />
          <Skeleton shape='text' className='mt-1' width={120} height={16} />
        </div>
      </div>
      <div className='flex justify-around items-center h-[88px] mt-5 p-5'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='flex flex-col items-center gap-2'>
            <Skeleton width={32} height={32} />
            <Skeleton shape='text' width={48} height={12} />
            <Skeleton shape='text' width={32} height={14} />
          </div>
        ))}
      </div>

      <div className='flex mt-10 gap-4'>
        <div className='flex flex-col gap-4'>
          <Skeleton shape='text' width={80} height={30} />
          <div className='flex gap-10'>
            <div className='flex flex-col gap-4'>
              <Skeleton shape='square' width={140} height={140} />
              <Skeleton shape='text' width={100} height={20} />
              <Skeleton shape='text' width={60} height={20} />
              <Skeleton shape='text' width={140} height={20} />
            </div>
            <div className='flex flex-col gap-4'>
              <Skeleton shape='square' width={140} height={140} />
              <Skeleton shape='text' width={100} height={20} />
              <Skeleton shape='text' width={60} height={20} />
              <Skeleton shape='text' width={140} height={20} />
            </div>
            <div className='flex flex-col gap-4'>
              <Skeleton shape='square' width={140} height={140} />
              <Skeleton shape='text' width={100} height={20} />
              <Skeleton shape='text' width={60} height={20} />
              <Skeleton shape='text' width={140} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-10'>
        <Skeleton shape='text' width={80} height={30} />
        <div className='flex gap-10'>
          <div className='flex flex-col gap-4'>
            <Skeleton shape='square' width={140} height={140} />
            <Skeleton shape='text' width={100} height={20} />
            <Skeleton shape='text' width={60} height={20} />
            <Skeleton shape='text' width={140} height={20} />
          </div>
          <div className='flex flex-col gap-4'>
            <Skeleton shape='square' width={140} height={140} />
            <Skeleton shape='text' width={100} height={20} />
            <Skeleton shape='text' width={60} height={20} />
            <Skeleton shape='text' width={140} height={20} />
          </div>
          <div className='flex flex-col gap-4'>
            <Skeleton shape='square' width={140} height={140} />
            <Skeleton shape='text' width={100} height={20} />
            <Skeleton shape='text' width={60} height={20} />
            <Skeleton shape='text' width={140} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MyPageErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => (
  <ErrorFallback className='flex-1'>
    <ErrorFallback.Title>알 수 없는 에러가 발생했습니다</ErrorFallback.Title>
    <ErrorFallback.Description>잠시 후 다시 시도해 주세요</ErrorFallback.Description>
    <ErrorFallback.Actions>
      <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
    </ErrorFallback.Actions>
  </ErrorFallback>
);
