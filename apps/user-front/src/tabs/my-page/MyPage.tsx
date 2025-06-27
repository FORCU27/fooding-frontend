'use client';

import { Button } from '@repo/design-system/components/b2c';
import {
  FoodingIcon,
  GiftIcon,
  MessageDotsSquareIcon,
  SettingIcon,
  TicketIcon,
} from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { FadeIn } from '@/components/Layout/FadeIn';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { RestaurantsListSection } from '@/components/Restaurant/RestaurantsListSection';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';

export const MyPageTab: ActivityComponentType<'MyPageTab'> = () => {
  const { logout } = useAuth();

  const handleLogoutClick = async () => {
    logout();

    location.reload();
  };

  return (
    <Screen
      header={<Header title='마이페이지' right={<SettingIcon onClick={handleLogoutClick} />} />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <FadeIn>
        <Content />
      </FadeIn>
    </Screen>
  );
};

const Content = () => {
  const { user } = useAuth();
  const flow = useFlow();

  const { data: stores } = useGetStoreList({
    pageNum: 1,
    pageSize: 3,
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
  });

  return (
    <div className='w-full'>
      <div className='flex-col bg-white/80 pb-5 py-grid-margin'>
        <div className='flex justify-between px-grid-margin'>
          <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center w-[64px] h-[64px] bg-gray-1 rounded-full'>
              <FoodingIcon fillOpacity={0.1} />
            </div>
            <div className='flex-col mx-5 justify-center items-center w-[100px]'>
              <p className='subtitle-4 mb-2'>{user?.nickname ? user?.nickname : user?.email}</p>
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
      {stores && (
        <div className='mt-3'>
          <RestaurantsListSection
            items={stores.data.list}
            subtitle='찜해둔 식당'
            onClickTotalBtn={() => flow.push('BookmarkListScreen', {})}
          />
          <RestaurantsListSection
            items={stores.data.list}
            subtitle='최근 본 식당'
            onClickTotalBtn={() => flow.push('MyPageTab', {})}
          />
        </div>
      )}
    </div>
  );
};
