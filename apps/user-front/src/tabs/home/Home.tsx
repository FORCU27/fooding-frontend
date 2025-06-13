'use client';

import Image from 'next/image';

import { Button, ChipTabs } from '@repo/design-system/components/b2c';
import { BookmarkIcon, ChevronRightIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Screen } from '@/components/Layout/Screen';
import { RestaurantsListSection } from '@/components/Restaurant/RestaurantsListSection';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import Header from '@/tabs/home/components/Header';
import Menubar from '@/tabs/home/components/Menubar';

export const HomeTab: ActivityComponentType<'HomeTab'> = () => {
  return (
    <Screen header={<Header />} bottomTab={<BottomTab currentTab='home' />}>
      <Content />
    </Screen>
  );
};

const Content = () => {
  const {
    data: stores,
    isPending,
    isError,
  } = useGetStoreList({
    pageNum: 1,
    pageSize: 10,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  if (isPending) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러발생</div>;
  }

  return (
    <div className='flex flex-col w-full'>
      <Menubar />
      <div className='bg-white mb-3'>
        <div className='relative w-full h-[200px]'>
          <Image
            src='/images/home/banneritem1.png'
            alt='banner'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute top-6 left-7'>
            <p className='text-white body-3 mb-1'>흑백요리사 출연 셰프 맛집</p>
            <p className='text-white headline-1'>오늘 메뉴는 뭔가요?</p>
          </div>
          <Button className='absolute left-6 bottom-6' size='small' variant='primary'>
            <p className='body-5 mr-2'>예약하러 가기</p>
            <ChevronRightIcon size={20} color='var(--color-white)' />
          </Button>
          <div className='absolute right-6 bottom-6 w-[48px] h-[28px] rounded-[8px] bg-black/60 flex justify-center items-center'>
            <p className='body-8 text-white opacity-100'>1 / 10</p>
          </div>
        </div>
        <div className='flex flex-col mb-3'>
          <div className='flex flex-col justify-between p-grid-margin gap-4'>
            <div className='subtitle-1'>오늘은 어디에서 식사할까요?</div>
            <ChipTabs defaultValue='1' className='-mx-grid-margin w-auto'>
              <ChipTabs.List className='overflow-x-auto w-full scrollbar-hide px-grid-margin'>
                <ChipTabs.Trigger value='1'>고깃집</ChipTabs.Trigger>
                <ChipTabs.Trigger value='2'>패스트푸드점</ChipTabs.Trigger>
                <ChipTabs.Trigger value='3'>카페</ChipTabs.Trigger>
                <ChipTabs.Trigger value='4'>레스토랑</ChipTabs.Trigger>
                <ChipTabs.Trigger value='5'>일식</ChipTabs.Trigger>
                <ChipTabs.Trigger value='6'>베이커리</ChipTabs.Trigger>
                <ChipTabs.Trigger value='7'>기타</ChipTabs.Trigger>
              </ChipTabs.List>
            </ChipTabs>
            <div className='flex flex-col bg-white/80'>
              <ul className='flex gap-3 overflow-x-auto scrollbar-hide -mx-grid-margin px-grid-margin'>
                {stores.data.list.map((store) => (
                  <li key={store.id} className='flex flex-col cursor-pointer relative'>
                    <div className='relative mb-2 rounded-xl overflow-hidden w-[220px] h-[140px]'>
                      {store.mainImage ? (
                        <Image
                          width={220}
                          height={140}
                          src={`/${store.mainImage}`}
                          alt={store.name || 'restaurant image'}
                          className='rounded-xl object-cover w-[220px] h-[140px]'
                        />
                      ) : (
                        <div className='flex justify-center items-center bg-gray-1 w-[220px] h-[140px]'>
                          <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
                        </div>
                      )}

                      {store.isFinished && (
                        <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
                          <p className='subtitle-3 text-white'>영업 종료</p>
                        </div>
                      )}
                    </div>
                    {store.isBookMarded ? (
                      <BookmarkIcon
                        className='absolute top-2 right-2'
                        color='var(--color-primary-pink)'
                        fill='var(--color-primary-pink)'
                        size={24}
                        cursor='pointer'
                      />
                    ) : (
                      <BookmarkIcon
                        className='absolute top-2 right-2'
                        color='white'
                        size={24}
                        cursor='pointer'
                      />
                    )}
                    <div className='flex flex-col gap-1'>
                      <div className='subtitle-5 flex items-center gap-1'>
                        <p className='subtitle-5 w-[128px] truncate'>{store.name}</p>
                        <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
                        <span className='text-[#FFD83D] subtitle-6'>{store.averageRating}</span>
                        <span className='body-6 text-gray-5'>({store.reviewCount})</span>
                      </div>
                      <p className='body-8 text-gray-5'>
                        {store.city.length >= 3 ? store.city.slice(0, 2) : store.city} •{' '}
                        {store.estimatedWaitingTimeMinutes
                          ? `예상 대기시간 ${store.estimatedWaitingTimeMinutes}분`
                          : '바로 입장가능'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <RestaurantsListSection subtitle='푸딩에서 인기 많은 식당이에요' items={stores.data.list} />
      <RestaurantsListSection subtitle='새로 오픈했어요!' items={stores.data.list} />
      <RestaurantsListSection subtitle='지금 바로 입장하실 수 있어요!' items={stores.data.list} />
    </div>
  );
};
