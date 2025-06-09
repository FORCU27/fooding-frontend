'use client';

import { mockStoreListResponse } from '@repo/api/user';
import { Button, ChipTabs, NavButton } from '@repo/design-system/components/b2c';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  IconProps,
  MarkPinIcon,
  PhoneIcon,
  ShareIcon,
  StarIcon,
  TrainIcon,
} from '@repo/design-system/icons';

import { Section } from '@/components/Layout/Section';
import { MenuCard } from '@/components/Restaurant/MenuCard';
import { RestaurantsListSection } from '@/components/Restaurant/RestaurantsListSection';
import { ReviewCard } from '@/components/Restaurant/ReviewCard';
import { SubwayLineBadge } from '@/components/SubwayLineBadge';
import { cn } from '@/utils/cn';

export default function StoreDetailPage() {
  return (
    <main className='pb-[120px]'>
      <div className='h-[280px] bg-gray-300 relative'>
        <NavButton className='absolute left-grid-margin top-3'>
          <ChevronLeftIcon className='size-7' />
        </NavButton>
        <NavButton className='absolute right-grid-margin top-3'>
          <ShareIcon className='size-5' />
        </NavButton>
      </div>
      <Section className='pt-[30px] pb-[20px]'>
        <span className='flex items-center body-5 text-gray-5'>
          제주 제주시
          <span className='mx-[6px] w-[1px] h-[12px] bg-[#76767630]' />
          돼지고기구이
        </span>
        <h1 className='mt-[10px] headline-2 text-black'>바다풍경 정육식당 흑돼지 용담탑동본점</h1>
        <div className='mt-3 flex items-center'>
          <div className='flex items-center gap-1'>
            <StarIcon className='stroke-fooding-yellow fill-fooding-yellow' />
            <span className='subtitle-6 text-fooding-yellow'>4.0</span>
          </div>
          <span className='ml-1 body-5 text-gray-5'>( 리뷰 845개 )</span>
        </div>
      </Section>
      <Section className='mt-[10px] flex-row py-[20px] divide-x divide-gray-1'>
        <div className='flex flex-col items-center flex-1'>
          <ColorFireIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>실시간</span>
          <span className='subtitle-6 text-black'>5명이 보고있어요</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <ColorSmileIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>대기인원</span>
          <span className='subtitle-6 text-black'>7팀</span>
        </div>
        <div className='flex flex-col items-center flex-1'>
          <ColorClockIcon className='size-[50px]' />
          <span className='body-7 text-gray-5'>대기시간</span>
          <span className='subtitle-6 text-black'>20분</span>
        </div>
      </Section>
      <Section className='mt-[10px] py-[14px]'>
        <ChipTabs defaultValue='1' className='-mx-grid-margin w-auto'>
          <ChipTabs.List className='overflow-x-auto w-full scrollbar-hide px-grid-margin'>
            <ChipTabs.Trigger value='1'>홈</ChipTabs.Trigger>
            <ChipTabs.Trigger value='2'>소식</ChipTabs.Trigger>
            <ChipTabs.Trigger value='3'>메뉴</ChipTabs.Trigger>
            <ChipTabs.Trigger value='4'>사진</ChipTabs.Trigger>
            <ChipTabs.Trigger value='5'>리뷰</ChipTabs.Trigger>
            <ChipTabs.Trigger value='6'>매장정보</ChipTabs.Trigger>
          </ChipTabs.List>
        </ChipTabs>
      </Section>
      <Section className='mt-[10px] py-[20px] gap-[6px]'>
        <span className='body-6 flex items-center gap-[10px]'>
          <MarkPinIcon className='size-[18px] stroke-1' />
          제주 제주시 서해안로 654 바다풍경 정육식당
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <ClockIcon className='size-[18px] stroke-1' />
          <button className='flex items-center h-[26px] subtitle-7 text-white bg-gradient-to-r from-[#35FFBF] to-[#6CB8FF] rounded-full px-[10px]'>
            영업중
          </button>
          매일 10:40 - 21:50
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <PhoneIcon className='size-[18px] stroke-1' />
          0507-1476-7856
        </span>
      </Section>
      <Section className='mt-[10px] pb-8'>
        <Section.Header>
          <Section.Title>메뉴</Section.Title>
          <Section.Link>더보기</Section.Link>
        </Section.Header>
        <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin'>
          {mockMenus.map((menu) => (
            <MenuCard key={menu.id}>
              <MenuCard.Image src={null} alt={menu.title} />
              <MenuCard.Title>{menu.title}</MenuCard.Title>
              <MenuCard.Price>{menu.price.toLocaleString()}</MenuCard.Price>
            </MenuCard>
          ))}
        </ul>
      </Section>
      <Section className='mt-[10px]'>
        <Section.Header>
          <Section.Title className='flex items-center gap-1'>
            리뷰
            <span className='subtitle-6 text-gray-5'>(193)</span>
          </Section.Title>
          <button className='flex items-center h-fit body-5 text-gray-5'>
            더보기
            <ChevronRightIcon className='size-[18px]' />
          </button>
        </Section.Header>
        <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin pb-8'>
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} />
          ))}
        </ul>
      </Section>
      <Section className='mt-[10px] pb-8'>
        <Section.Header>
          <Section.Title>매장 위치</Section.Title>
        </Section.Header>
        <div className='mt-[14px] rounded-[12px] bg-gray-1 h-[262px]' />
        <div className='mt-3 flex flex-col gap-1'>
          <span className='body-6 flex items-center gap-[10px]'>
            <MarkPinIcon className='size-[18px] stroke-1' />
            제주 제주시 서해안로 654 바다풍경 정육식당
          </span>
          <span className='body-6 flex items-center'>
            <TrainIcon className='mr-[10px] size-[18px] stroke-1' />
            <SubwayLineBadge className='mr-1' line={6} />
            제주역에서 847m
          </span>
        </div>
        <Button className='mt-5' variant='gray'>
          <CompassIcon className='mr-1 size-[18px]' />
          길찾기
        </Button>
      </Section>
      <div className='mt-[10px]'>
        <RestaurantsListSection
          subtitle='다른사람이 함께 본 비슷한 식당'
          items={mockStoreListResponse.data.list}
        />
        <RestaurantsListSection
          subtitle='지금 바로 입장하실 수 있어요!'
          items={mockStoreListResponse.data.list}
        />
      </div>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 flex items-center gap-4 px-grid-margin py-grid-margin bg-white rounded-t-[16px]',
          // TODO: 임의로 설정한 그림자 효과 수정
          'shadow-[0_4px_24px_rgba(0,0,0,0.0.1)]',
        )}
      >
        <button className='flex flex-col size-[56px] justify-center items-center gap-1 shrink-0 cursor-pointer'>
          <BookmarkIcon />
          <span className='subtitle-4 text-black h-[19px]'>103</span>
        </button>
        <Button>줄서기</Button>
      </div>
    </main>
  );
}

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

const mockMenus = [
  { id: '1', title: '흑돼지 모듬 (100g)', price: 9000 },
  { id: '2', title: '흑돼지 목살 (100g)', price: 10900 },
  { id: '3', title: '한우 새우살 (100g)', price: 32000 },
  { id: '4', title: '한우 새우살 (100g)', price: 32000 },
  { id: '5', title: '한우 새우살 (100g)', price: 32000 },
  { id: '6', title: '한우 새우살 (100g)', price: 32000 },
] as const;

const mockReviews = [
  {
    id: '1',
    rating: 4,
    mainImage: null,
    content:
      '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...',
    createdAt: '2023-10-01T12:00:00Z',
    author: {
      id: '1',
      name: '민수엄마',
      reviewCount: 10,
      followerCount: 207,
    },
  },
  {
    id: '2',
    rating: 4,
    mainImage: null,
    content:
      '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...',
    createdAt: '2023-10-01T12:00:00Z',
    author: {
      id: '1',
      name: '민수엄마',
      reviewCount: 10,
      followerCount: 207,
    },
  },
  {
    id: '3',
    rating: 4,
    mainImage: null,
    content:
      '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...',
    createdAt: '2023-10-01T12:00:00Z',
    author: {
      id: '1',
      name: '민수엄마',
      reviewCount: 10,
      followerCount: 207,
    },
  },
] as const;
