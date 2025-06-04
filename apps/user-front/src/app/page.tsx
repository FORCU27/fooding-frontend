'use client';
import Image from 'next/image';

import { Button, ChipTabs } from '@repo/design-system/components/b2c';
import { BookmarkIcon, ChevronRightIcon, StarIcon } from '@repo/design-system/icons';
import { NextPage } from 'next';

import {
  RestaurantsListSection,
  RestaurantItem,
} from '@/components/Restaurant/RestaurantsListSection';

//FIXME: 추후 API 연결
const menuItems: RestaurantItem[] = [
  {
    id: 1,
    image: 'images/home/menuitem2.png',
    name: '바다풍경 정육식당 흑돼지 용담탑동본점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: true,
    finished: false,
  },

  {
    id: 2,
    image: 'images/home/menuitem1.png',
    name: '엉터리 생고기 엉생 무한리필 아산테크노 밸리점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: false,
    finished: true,
  },

  {
    id: 3,
    image: 'images/home/menuitem3.png',
    name: '민서네 김밥 홍대점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: false,
    finished: false,
  },
  {
    id: 4,
    image: 'images/home/menuitem2.png',
    name: '바다풍경 정육식당 흑돼지 용담탑동본점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: true,
    finished: false,
  },

  {
    id: 5,
    image: 'images/home/menuitem1.png',
    name: '엉터리 생고기 엉생 무한리필 아산테크노 밸리점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: true,
    finished: true,
  },

  {
    id: 6,
    image: 'images/home/menuitem3.png',
    name: '민서네 김밥 홍대점',
    reviewScore: 4.9,
    reviewCount: 231,
    city: '합정',
    estimatedWaitingTimeMinutes: 20,
    bookMarded: false,
    finished: false,
  },
];

const Home: NextPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='bg-white mb-3'>
        <div className='relative w-full h-[200px]'>
          <Image src='/images/home/banneritem1.png' alt='banner' fill className='object-cover' />
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
          <div className='flex flex-col justify-between p-5 gap-4'>
            <div className='subtitle-1'>오늘은 어디에서 식사할까요?</div>
            <ChipTabs defaultValue='1' onChange={(value) => console.log('선택된 탭:', value)}>
              <ChipTabs.List className='overflow-x-auto w-full scrollbar-hide'>
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
              <div className='overflow-x-auto scrollbar-hide'>
                <div className='flex gap-3 h-[194px]'>
                  {menuItems.map((item) => (
                    <div key={item.id} className='flex flex-col relative'>
                      <div className='relative mb-2 rounded-xl overflow-hidden'>
                        <Image
                          width={220}
                          height={140}
                          src={`/${item.image}`}
                          alt={item.name || 'restaurant image'}
                          className='rounded-xl object-cover w-[220px] h-[140px]'
                        />

                        {item.finished && (
                          <div className='absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl'>
                            <p className='subtitle-3 text-white'>영업 종료</p>
                          </div>
                        )}
                      </div>
                      {item.bookMarded ? (
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
                          <p className='subtitle-5 w-[128px] truncate'>{item.name}</p>
                          <StarIcon size={18} fill='#FFD83D' color='#FFD83D' />
                          <span className='text-[#FFD83D] subtitle-6'>{item.reviewScore}</span>
                          <span className='body-6 text-gray-5'>({item.reviewCount})</span>
                        </div>
                        <p className='body-8 text-gray-5'>
                          {item.city} • 예상 대기시간 {item.estimatedWaitingTimeMinutes}분
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RestaurantsListSection subtitle='푸딩에서 인기 많은 식당이에요' items={menuItems} />
      <RestaurantsListSection subtitle='새로 오픈했어요!' items={menuItems} />
      <RestaurantsListSection subtitle='지금 바로 입장하실 수 있어요!' items={menuItems} />
    </div>
  );
};

export default Home;
