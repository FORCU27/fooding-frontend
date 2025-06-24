'use client';

import { Slot } from '@repo/design-system/components';
import { HomeIcon, ListIcon, SearchIcon } from '@repo/design-system/icons';
import { Link } from '@stackflow/link/future';

import { MyPageLink } from '../MyPage/MyPageLink';
import { cn } from '@/utils/cn';

type Tab = 'home' | 'search' | 'reservation' | 'mypage';

type BottomTabProps = {
  currentTab: Tab;
};

const BottomTab = ({ currentTab }: BottomTabProps) => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 flex w-full h-16 justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.08)]'>
      <BottomTabItem isActive={currentTab === 'home'}>
        <Link activityName='HomeTab' activityParams={{}} replace animate={false}>
          <HomeIcon size={24} />
          <BottomTabLabel>메인</BottomTabLabel>
        </Link>
      </BottomTabItem>
      <BottomTabItem isActive={currentTab === 'search'}>
        <Link activityName='SearchTab' activityParams={{}} replace animate={false}>
          <SearchIcon size={24} />
          <BottomTabLabel>검색</BottomTabLabel>
        </Link>
      </BottomTabItem>
      <BottomTabItem isActive={currentTab === 'reservation'}>
        <Link activityName='ReservationTab' activityParams={{}} replace animate={false}>
          <ListIcon size={24} />
          <BottomTabLabel>예약/웨이팅</BottomTabLabel>
        </Link>
      </BottomTabItem>

      <MyPageLink
        BottomTabItem={BottomTabItem}
        BottomTabLabel={BottomTabLabel}
        isActive={currentTab === 'mypage'}
      />
    </nav>
  );
};

type BottomTabItemProps = {
  children: React.ReactNode;

  isActive: boolean;
};

const BottomTabItem = ({ children, isActive }: BottomTabItemProps) => {
  return (
    <Slot.Root
      className={cn(
        'flex flex-col items-center gap-1 text-gray-5 min-w-[64px] cursor-pointer',
        isActive && 'text-primary-pink',
      )}
    >
      {children}
    </Slot.Root>
  );
};

const BottomTabLabel = ({ children }: { children: React.ReactNode }) => {
  return <span className='subtitle-7'>{children}</span>;
};

export default BottomTab;
