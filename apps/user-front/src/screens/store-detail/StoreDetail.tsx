'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button, ChipTabs, NavButton, Skeleton } from '@repo/design-system/components/b2c';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  FoodingIcon,
  IconProps,
  ShareIcon,
  StarIcon,
} from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { StoreDetailHomeTab } from './components/tabs/Home';
import { StoreDetailMenuTab } from './components/tabs/Menu';
import { StoreDetailPhotoTab } from './components/tabs/Photo';
import { StoreDetailReviewTab } from './components/tabs/ReviewDetail';
import { StoreDetailPostListTab } from './components/tabs/StorePostList';
import { StoreRewardListTab } from './components/tabs/StoreRewardList';
import { useLoginBottomSheet } from '@/components/Auth/LoginBottomSheet';
import { Carousel } from '@/components/Carousel';
import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { Section } from '@/components/Layout/Section';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useAddBookmark } from '@/hooks/bookmark/useAddBookmark';
import { useDeleteBookmark } from '@/hooks/bookmark/useDeleteBookmark';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useScrollVisibility } from '@/hooks/useScrollVisibility';
import { cn } from '@/utils/cn';

// TODO: mock 데이터 제거
const mock = {
  realtimeViewers: 5,
  waitingCount: 7,
  bookmarkCount: 103,
} as const;

export const StoreDetailScreen: ActivityComponentType<'StoreDetailScreen'> = ({ params }) => {
  const flow = useFlow();

  const screenRef = useRef<HTMLDivElement>(null);

  const { isVisible: showHeader } = useScrollVisibility({
    threshold: 280,
    ref: screenRef,
  });

  const initialTab = params.tab ?? 'home';

  return (
    <Screen ref={screenRef}>
      <DefaultErrorBoundary>
        <NavButton className='z-10 absolute left-grid-margin top-3' onClick={() => flow.pop()}>
          <ChevronLeftIcon className='size-7' />
        </NavButton>
        <LoadingToggle fallback={<StoreDetailLoadingFallback />}>
          <Suspense clientOnly fallback={<StoreDetailLoadingFallback />}>
            <StoreDetail storeId={params.storeId} showHeader={showHeader} initialTab={initialTab} />
          </Suspense>
        </LoadingToggle>
      </DefaultErrorBoundary>
    </Screen>
  );
};

type StoreDetailProps = {
  storeId: number;
  showHeader: boolean;
  initialTab?: string;
};

const StoreDetail = ({ storeId, showHeader, initialTab = 'home' }: StoreDetailProps) => {
  const { user } = useAuth();
  const { data: store } = useGetStoreDetail(storeId);
  const loginBottomSheet = useLoginBottomSheet();
  const addBookMark = useAddBookmark();
  const deleteBookMark = useDeleteBookmark();
  const isLoggedIn = !!user;
  const [isBookmarked, setIsBookmarked] = useState(store.isBookmarked);

  useEffect(() => {
    setIsBookmarked(store.isBookmarked);
  }, [store.isBookmarked]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    if (!isLoggedIn && !isBookmarked) {
      e.preventDefault();
      loginBottomSheet.open();
      return;
    }

    const bookmarkState = isBookmarked;

    setIsBookmarked(!bookmarkState);

    const mutation = bookmarkState ? deleteBookMark : addBookMark;

    mutation.mutate(store.id, {
      onError: () => {
        setIsBookmarked(!bookmarkState);
      },
    });
  };

  return (
    <div className='flex flex-col min-h-dvh'>
      {showHeader && <Header left={<Header.Back />} title={store.name} />}
      {/* TODO: 공유 기능 추가 */}
      <NavButton className='z-10 absolute right-grid-margin top-3'>
        <ShareIcon className='size-5' />
      </NavButton>
      {store.images.length === 0 && <StoreImagePlaceholder />}
      {store.images.length > 0 && (
        <StoreImageCarousel imageUrls={store.images.map((image) => image.imageUrl)} />
      )}
      <Section className='pt-[30px] pb-[20px]'>
        <span className='flex items-center body-5 text-gray-5'>
          {store.address}
          <span className='mx-[6px] w-[1px] h-[12px] bg-[#76767630]' />
          {store.category}
        </span>
        <h1 className='mt-[10px] headline-2 text-black' data-testid='store-name'>
          {store.name}
        </h1>
        <div className='mt-3 flex items-center'>
          <div className='flex items-center gap-1'>
            <StarIcon className='stroke-fooding-yellow fill-fooding-yellow' />
            <span className='subtitle-6 text-fooding-yellow'>{store.averageRating}</span>
          </div>
          <span className='ml-1 body-5 text-gray-5'>( 리뷰 {store.reviewCount}개 )</span>
        </div>
      </Section>
      <Section className='mt-[10px] flex-row py-[20px] divide-x divide-gray-1'>
        <div className='flex flex-col items-center flex-1'>
          <ColorFireIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>실시간</span>
          <span className='subtitle-6 text-black'>{mock.realtimeViewers}명이 보고있어요</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <ColorSmileIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>대기인원</span>
          <span className='subtitle-6 text-black'>{mock.waitingCount}팀</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <ColorClockIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>대기시간</span>
          <span className='subtitle-6 text-black'>{store.estimatedWaitingTimeMinutes ?? 0}분</span>
        </div>
      </Section>
      <Section className='mt-[10px] pt-[14px] pb-[100px]'>
        <ChipTabs defaultValue={initialTab} scrollable>
          <ChipTabs.List>
            <ChipTabs.Trigger value='home'>홈</ChipTabs.Trigger>
            <ChipTabs.Trigger value='news'>소식</ChipTabs.Trigger>
            <ChipTabs.Trigger value='menu'>메뉴</ChipTabs.Trigger>
            <ChipTabs.Trigger value='photo'>사진</ChipTabs.Trigger>
            <ChipTabs.Trigger value='review'>리뷰</ChipTabs.Trigger>
            <ChipTabs.Trigger value='reward'>리워드</ChipTabs.Trigger>
            <ChipTabs.Trigger value='info'>매장정보</ChipTabs.Trigger>
          </ChipTabs.List>
          <Suspense>
            <ChipTabs.Content value='home'>
              <StoreDetailHomeTab store={store} />
            </ChipTabs.Content>
            <ChipTabs.Content value='news'>
              <StoreDetailPostListTab storeId={storeId} />
            </ChipTabs.Content>
            <ChipTabs.Content value='menu'>
              <StoreDetailMenuTab store={store} />
            </ChipTabs.Content>
            <ChipTabs.Content value='review'>
              <StoreDetailReviewTab store={store} />
            </ChipTabs.Content>
            <ChipTabs.Content value='photo'>
              <StoreDetailPhotoTab store={store} />
            </ChipTabs.Content>
            <ChipTabs.Content value='reward'>
              <StoreRewardListTab storeId={storeId} />
            </ChipTabs.Content>
          </Suspense>
        </ChipTabs>
      </Section>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 flex items-center gap-4 px-grid-margin py-grid-margin bg-white rounded-t-[16px]',
          // TODO: 임의로 설정한 그림자 효과 수정
          'shadow-[0_4px_24px_rgba(0,0,0,0.0.1)]',
        )}
      >
        <button className='flex flex-col size-[56px] justify-center items-center gap-1 shrink-0 cursor-pointer'>
          <BookmarkIcon
            cursor='pointer'
            color={isBookmarked ? 'var(--color-primary-pink)' : 'var(--color-gray-5)'}
            fill={isBookmarked ? 'var(--color-primary-pink)' : 'none'}
            onClick={handleBookmarkClick}
          />
          <span className='subtitle-4 text-black h-[19px]'>{store.bookmarkCount}</span>
        </button>
        {/* TODO: 줄서기 기능 추가 */}
        <Button>줄서기</Button>
      </div>
    </div>
  );
};

const ColorFireIcon = (props: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='192'
      height='192'
      viewBox='0 0 192 192'
      fill='none'
      {...props}
    >
      <path
        d='M138.684 135.155C156.186 109.479 137.219 72.9754 125.548 57.9331C125.548 59.2287 124.471 67.96 122.122 71.8844C119.133 76.8763 114.073 75.2392 111.762 71.8844C101.817 59.1517 99.6372 39.1197 99.7907 30.6953C86.8985 37.6234 74.6202 55.5834 70.0926 63.6974C64.199 71.5617 59.6116 63.1313 58.0545 57.9331C41.2998 82.8542 41.063 108.567 43.0389 118.309C49.5408 149.835 76.1714 159.623 88.674 160.576C114.681 164.644 132.851 145.324 138.684 135.155Z'
        fill='#F96464'
      />
      <path
        d='M118.554 145.854C128.925 130.75 117.685 109.277 110.769 100.429C110.769 101.191 110.131 106.327 108.739 108.635C106.968 111.572 103.969 110.609 102.6 108.635C96.7061 101.145 95.4146 89.3618 95.5056 84.4062C87.8658 88.4816 80.5897 99.0464 77.9067 103.819C74.4142 108.446 71.6957 103.486 70.7731 100.429C60.8443 115.088 60.704 130.214 61.8749 135.944C65.7279 154.489 81.509 160.247 88.918 160.807C104.33 163.2 115.097 151.835 118.554 145.854Z'
        fill='#F7C562'
      />
    </svg>
  );
};

const ColorSmileIcon = (props: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='192'
      height='192'
      viewBox='0 0 192 192'
      fill='none'
      {...props}
    >
      <circle cx='95.9126' cy='95.9126' r='57.5455' fill='#FFCC00' />
      <path
        d='M61.3828 107.422C74.0408 116.498 100.017 127.994 130.437 107.422'
        stroke='#FF6A00'
        strokeWidth='8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <ellipse cx='84.3993' cy='90.1534' rx='7.67273' ry='9.59091' fill='#FF6A00' />
      <ellipse cx='107.415' cy='90.1534' rx='7.67273' ry='9.59091' fill='#FF6A00' />
    </svg>
  );
};

const ColorClockIcon = (props: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='192'
      height='192'
      viewBox='0 0 192 192'
      fill='none'
      {...props}
    >
      <circle cx='95.9048' cy='95.9126' r='57.5455' fill='#B2B1FF' />
      <path
        d='M95.9062 65.2188V95.9097H115.088'
        stroke='#6563FF'
        strokeWidth='8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const StoreDetailLoadingFallback = () => {
  return (
    <div className='flex flex-col'>
      <Skeleton shape='square' height={280} />
      <div className='flex flex-col px-grid-margin'>
        <Skeleton shape='text' className='mt-8' width={160} height={16} />
        <Skeleton shape='text' className='mt-4' width={240} height={36} />
        <Skeleton shape='text' className='mt-4' width={100} height={20} />
        <div className='mt-14 flex justify-around'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='flex flex-col items-center'>
              <Skeleton shape='circle' width={40} height={40} />
              <Skeleton shape='text' className='mt-2' width={60} height={12} />
              <Skeleton shape='text' className='mt-1' width={40} height={12} />
            </div>
          ))}
        </div>
        <Skeleton shape='text' className='mt-11' width={320} height={32} />
        <Skeleton shape='text' className='mt-8' width={280} height={20} />
        <Skeleton shape='text' className='mt-2' width={200} height={20} />
        <Skeleton shape='text' className='mt-2' width={160} height={20} />
      </div>
    </div>
  );
};

type CarouselProps = {
  imageUrls: string[];
};

const StoreImagePlaceholder = () => {
  return (
    <div className='h-[280px] bg-gray-1 flex justify-center items-center shrink-0'>
      <FoodingIcon className='text-[#111111]/10 w-[92px] h-[114px]' />
    </div>
  );
};

const StoreImageCarousel = ({ imageUrls }: CarouselProps) => {
  return (
    <Carousel>
      <Carousel.Region>
        <Carousel.List>
          {imageUrls.map((imageUrl, index) => (
            <Carousel.Item key={index} className='h-[280px]'>
              <Image fill style={{ objectFit: 'cover' }} src={imageUrl} alt='메뉴 이미지' />
            </Carousel.Item>
          ))}
        </Carousel.List>
        <Carousel.Pagination>
          {({ page }) => (
            <div className='absolute bottom-5 right-5 text-white text-xs p-[10px] flex justify-center items-center bg-black/60 rounded-[8px] h-7'>
              {page} / {imageUrls.length}
            </div>
          )}
        </Carousel.Pagination>
      </Carousel.Region>
    </Carousel>
  );
};
