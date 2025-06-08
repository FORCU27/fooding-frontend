'use client';

import { Button } from '@repo/design-system/components/b2c';
import {
  FoodingIcon,
  GiftIcon,
  MessageDotsSquareIcon,
  SettingIcon,
  TicketIcon,
} from '@repo/design-system/icons';

import { useAuth } from '@/components/Provider/AuthProvider';
import { RestaurantsListSection } from '@/components/Restaurant/RestaurantsListSection';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

export default function MyPage() {
  const { user } = useAuth();

  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 3,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const currentPath = window.location.pathname;
        window.location.href = `/login?returnTo=${encodeURIComponent(currentPath)}`;
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <main className='w-full overflow-hidden'>
      <div className='flex-col bg-white/80 pb-5 p-grid-margin'>
        <div className='flex justify-center items-center mb-5 relative'>
          <p className='subtitle-1'>마이페이지</p>
          <SettingIcon
            className='absolute right-[20px] cursor-pointer'
            onClick={handleLogoutClick}
          />
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center w-[64px] h-[64px] bg-gray-1 rounded-full'>
              <FoodingIcon fillOpacity={0.1} />
            </div>
            <div className='flex-col mx-5 justify-center items-center w-[100px]'>
              <p className='subtitle-4 mb-2'>{user?.nickname}</p>
              <div className='flex justify-between'>
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
      {stores?.data && (
        <div className='mt-3'>
          <RestaurantsListSection items={stores?.data.list} subtitle='찜해둔 식당' />
          <RestaurantsListSection items={stores?.data.list} subtitle='최근 본 식당' />
        </div>
      )}
    </main>
  );
}
