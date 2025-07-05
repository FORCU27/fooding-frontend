'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import {
  B2BCeoSidebarStoreIcon,
  B2BCeoSidebarNewsIcon,
  B2BCeoSidebarReqularIcon,
  B2BCeoSidebarDeviceIcon,
  B2BCeoSidebarRewardIcon,
  B2BCeoSidebarStatisticsIcon,
} from '@repo/design-system/icons';

import { MenuItem, ScreenMode } from '../../types/layout';
import DrawerMenuSection from '../Home/DrawerMenuSection';

// 메뉴 아이템을 컴포넌트 외부로 이동하여 매번 재생성 방지
const createMenuItems = (activeMenuId: string | null) => [
  {
    id: 'store',
    text: '매장 정보 관리',
    path: '/store/basic',
    icon: (
      <B2BCeoSidebarStoreIcon size={20} stroke={activeMenuId === 'store' ? '#6366F1' : '#111111'} />
    ),
    subItems: [
      { id: '/store/basic', text: '기본정보', path: '/store/basic' },
      { id: '/store/news', text: '부가정보', path: '/store/news' },
      { id: '/store/menus', text: '메뉴', path: '/store/menus' },
      { id: '/store/seatGuide', text: '영업시간/휴뮤일', path: '/store/seatGuide' },
      { id: '/store/facilities', text: '시간', path: '/store/facilities' },
    ],
  },
  {
    id: 'news',
    text: '소식',
    path: '/news',
    icon: (
      <B2BCeoSidebarNewsIcon size={20} stroke={activeMenuId === 'news' ? '#6366F1' : '#111111'} />
    ),
  },
  {
    id: 'regular',
    text: '단골',
    path: '/regular',
    icon: (
      <B2BCeoSidebarReqularIcon
        size={20}
        stroke={activeMenuId === 'regular' ? '#6366F1' : '#111111'}
      />
    ),
  },
  {
    id: 'reward',
    text: '리워드 · 쿠폰',
    path: '/reward',
    subItems: [
      { id: '/reward/point', text: '적립', path: '/reward/point' },
      { id: '/reward/coupon', text: '쿠폰', path: '/reward/coupon' },
      { id: '/reward/pointshop', text: '포인트샵', path: '/reward/pointshop' },
    ],
    icon: (
      <B2BCeoSidebarRewardIcon
        size={20}
        stroke={activeMenuId === 'reward' ? '#6366F1' : '#111111'}
      />
    ),
  },
  {
    id: 'statistics',
    text: '통계',
    path: '/statistics',
    icon: (
      <B2BCeoSidebarStatisticsIcon
        size={20}
        stroke={activeMenuId === 'statistics' ? '#6366F1' : '#111111'}
      />
    ),
  },
  {
    id: 'devices',
    text: '기기관리',
    path: '/devices',
    icon: (
      <B2BCeoSidebarDeviceIcon
        size={20}
        stroke={activeMenuId === 'devices' ? '#6366F1' : '#111111'}
      />
    ),
  },
];

interface SideLayoutProps {
  screenMode?: ScreenMode;
  isOpen?: boolean;
  onClose?: () => void;
}

const SideLayout = ({ screenMode = 'desktop', isOpen, onClose }: SideLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // useMemo로 활성 메뉴 계산 메모이제이션
  const activeMenu = useMemo(() => {
    // 서브메뉴가 있는 경우 서브메뉴 경로 확인
    const allMenuItems = createMenuItems(null); // 임시로 null 전달

    for (const menu of allMenuItems) {
      if (menu.subItems) {
        const activeSubItem = menu.subItems.find(
          (subItem) => pathname === subItem.path || pathname.startsWith(subItem.path),
        );
        if (activeSubItem) {
          return { menu, subItem: activeSubItem };
        }
      } else {
        // 메인 메뉴 경로 확인
        if (pathname === menu.path || pathname.startsWith(menu.path)) {
          return { menu, subItem: null };
        }
      }
    }
    return null;
  }, [pathname]);

  // 활성 메뉴 ID 추출
  const activeMenuId = activeMenu?.menu.id || null;

  // 활성 메뉴 ID를 기반으로 메뉴 아이템 생성
  const menuItems = useMemo(() => createMenuItems(activeMenuId), [activeMenuId]);

  // useCallback으로 함수 메모이제이션
  const handleMenuClick = useCallback(
    (menu: MenuItem) => {
      console.log(menu);
      router.push(menu.path);
      // 모바일과 태블릿에서 메뉴 클릭 시 사이드바 닫기
      if (screenMode === 'mobile' || screenMode === 'tablet') {
        onClose?.();
      }
    },
    [router, screenMode, onClose],
  );

  // useCallback으로 배경 클릭 핸들러 메모이제이션
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    },
    [onClose],
  );

  // useMemo로 사이드바 컨텐츠 메모이제이션
  const sidebarContent = useMemo(
    () => (
      <DrawerMenuSection
        className='border-r border-gray-8 bg-white h-full'
        menuList={menuItems}
        onMenuClick={handleMenuClick}
        screenMode={screenMode}
        activeMenu={activeMenu}
      />
    ),
    [menuItems, handleMenuClick, screenMode, activeMenu],
  );

  // 모바일 모드: 오버레이 + 슬라이드 사이드바
  if (screenMode === 'mobile') {
    return (
      <>
        {/* 모바일 오버레이 */}
        {isOpen && (
          <div
            className='fixed top-[64px] left-0 right-0 bottom-0 bg-black opacity-50 z-30 md:hidden'
            onClick={handleBackdropClick}
          />
        )}

        {/* 모바일 사이드바 */}
        <div
          className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='w-[250px] h-full pt-[64px]'>{sidebarContent}</div>
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
            className='fixed top-[64px] left-0 right-0 bottom-0 bg-black opacity-50 z-30 lg:hidden md:block'
            onClick={handleBackdropClick}
          />
        )}

        {/* 태블릿 사이드바 */}
        <div
          className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out lg:hidden md:block ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='w-[280px] h-full pt-[64px]'>{sidebarContent}</div>
        </div>
      </>
    );
  }

  // 데스크톱 모드: 항상 표시되는 고정 사이드바
  return (
    <div className='hidden lg:block h-full'>
      <div className='w-[240px] h-full'>{sidebarContent}</div>
    </div>
  );
};

export default SideLayout;
