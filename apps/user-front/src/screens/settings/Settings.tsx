'use client';

import { ChevronRightIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';

export const SettingScreen: ActivityComponentType<'SettingScreen'> = () => {
  const { logout } = useAuth();

  const handleLogoutClick = async () => {
    logout();
    location.reload();
  };

  return (
    <Screen
      header={<Header title='설정' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <div className='flex flex-col justify-baseline items-baseline px-grid-margin py-grid-margin body-5'>
        <div className='flex flex-col w-full gap-9'>
          <p className='body-6 text-gray-5'>계정</p>
          <button className='flex justify-between'>
            <span>프로필 수정</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
          <button className='flex justify-between'>
            <span>내정보 수정</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
        </div>
        <div className='flex flex-col w-full gap-9 mt-11'>
          <p className='body-6 text-gray-5'>서비스 이용</p>
          <button className='flex justify-between'>
            <span>알림 설정</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
          <button className='flex justify-between'>
            <span>1:1 문의</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
        </div>
        <div className='flex flex-col w-full mt-11 mb-8 gap-7'>
          <p className='body-4 text-gray-5 mb-[11px]'>기타</p>
          <button className='flex justify-between'>
            <span>공지사항 및 이용약관</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
          <button className='flex justify-between'>
            <span>개선 제안</span>
            <ChevronRightIcon size={16} className='cursor-pointer' />
          </button>
        </div>
        <div className='flex flex-col subtitle-5 gap-7'>
          <button className='flex justify-between cursor-pointer' onClick={handleLogoutClick}>
            로그아웃
          </button>
          <button className='flex justify-between cursor-pointer'>회원탈퇴</button>
        </div>
      </div>
    </Screen>
  );
};
