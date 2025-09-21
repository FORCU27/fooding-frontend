'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CeoBellIcon } from '@repo/design-system/icons';
import { Suspense } from '@suspensive/react';

import { Drawer } from './Drawer';
import { StoreSelector } from '@/components/StoreSelector';
import { useGetSelf } from '@/hooks/auth/useGetSelf';
import { useLogout } from '@/hooks/auth/useLogout';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='sticky top-0 left-0 right-0 h-header-height z-10'>
      <div className='relative flex border-b border-gray-8 px-[32px] justify-between h-full bg-white items-center'>
        <Drawer
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          trigger={
            <button
              className='p-2 desktop:hidden -ml-2'
              aria-label='메뉴 토글'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          }
        />
        <div className='items-center gap-3 hidden desktop:flex'>
          <Image
            src='/images/fooding-ceo-logo.svg'
            width={162}
            height={28}
            alt='ceo-logo'
            className='object-contain'
          />
        </div>
        {/* TODO: 페이지 제목 표시 */}
        {/* <div className='desktop:hidden absolute left-1/2 -translate-x-1/2 subtitle-2'>부가정보</div> */}
        <Suspense clientOnly>
          <div className='flex items-center gap-[18px]'>
            <div className='gap-[18px] items-center hidden desktop:flex'>
              <StoreSelector />
              <UserProfile />
            </div>
            <Notifications />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { data: me } = useGetSelf();

  const router = useRouter();

  const logout = useLogout();

  const handleLogoutClick = async () => {
    if (logout.isPending) return;

    logout.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
      onError: () => {
        // TODO: 에러 처리
      },
    });
  };

  return (
    <>
      <span className='text-[14px] font-semibold'>{me.name} 사장님</span>
      <button
        type='button'
        onClick={handleLogoutClick}
        className={`cursor-pointer text-[14px] font-semibold text-gray-5 transition-all`}
      >
        로그아웃
      </button>
    </>
  );
};

const Notifications = () => {
  return <CeoBellIcon size={24} />;
};

const XIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-gray-700'
    >
      <line x1='18' y1='6' x2='6' y2='18'></line>
      <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  );
};

const MenuIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-gray-700'
    >
      <line x1='3' y1='6' x2='21' y2='6'></line>
      <line x1='3' y1='12' x2='21' y2='12'></line>
      <line x1='3' y1='18' x2='21' y2='18'></line>
    </svg>
  );
};
