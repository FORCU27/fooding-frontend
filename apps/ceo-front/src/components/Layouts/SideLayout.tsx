'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ScreenMode, MenuItem } from '../../types/layout';
import DrawerMenuSection from '../Home/DrawerMenuSection';

const menuItems: MenuItem[] = [
  {
    id: 'home',
    text: '매장 정보 관리',
    path: '/',
    subItems: [
      { id: '/home', text: '홈', path: '/' },
      { id: '/home/news', text: '소식', path: '/' },
      { id: '/home/menus', text: '메뉴', path: '/' },
      { id: '/home/seatGuide', text: '좌석안내', path: '/' },
      { id: '/home/facilities', text: '편의시설', path: '/' },
    ],
  },
  {
    id: 'devices',
    text: '기기관리',
    path: '/devices',
  },
];

interface SideLayoutProps {
  screenMode?: ScreenMode;
  isOpen?: boolean;
  onClose?: () => void;
}

const SideLayout = ({ screenMode = 'desktop', isOpen, onClose }: SideLayoutProps) => {
  const router = useRouter();

  const handleMenuClick = (menu: MenuItem) => {
    console.log(menu);
    router.push('/login');
    // 모바일과 태블릿에서 메뉴 클릭 시 사이드바 닫기
    if (screenMode === 'mobile' || screenMode === 'tablet') {
      onClose?.();
    }
  };

  // 모바일과 태블릿에서 ESC 키로 사이드바 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        (screenMode === 'mobile' || screenMode === 'tablet') &&
        isOpen
      ) {
        onClose?.();
      }
    };

    if (screenMode === 'mobile' || screenMode === 'tablet') {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [screenMode, isOpen, onClose]);

  // 모바일과 태블릿에서 배경 클릭 시 사이드바 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const sidebarContent = (
    <DrawerMenuSection
      className='border-r border-gray-8 bg-white h-full'
      menuList={menuItems}
      onMenuClick={handleMenuClick}
      screenMode={screenMode}
    />
  );

  // 모바일 모드: 오버레이 + 슬라이드 사이드바
  if (screenMode === 'mobile') {
    return (
      <>
        {/* 모바일 오버레이 */}
        {isOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
            onClick={handleBackdropClick}
          />
        )}

        {/* 모바일 사이드바 */}
        <div
          className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='w-[250px]'>{sidebarContent}</div>
        </div>
      </>
    );
  }

  // 태블릿 모드: 오버레이 + 슬라이드 사이드바 (모바일과 비슷하지만 더 넓음)
  if (screenMode === 'tablet') {
    return (
      <>
        {/* 태블릿 오버레이 */}
        {isOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden md:block'
            onClick={handleBackdropClick}
          />
        )}

        {/* 태블릿 사이드바 */}
        <div
          className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] z-50 transform transition-transform duration-300 ease-in-out lg:hidden md:block ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='w-[280px]'>{sidebarContent}</div>
        </div>
      </>
    );
  }

  // 데스크톱 모드: 항상 표시되는 고정 사이드바
  return (
    <div className='hidden lg:block'>
      <div className='w-[200px]'>{sidebarContent}</div>
    </div>
  );
};

export default SideLayout;
