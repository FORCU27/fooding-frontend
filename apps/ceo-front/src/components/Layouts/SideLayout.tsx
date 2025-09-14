'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  B2BCeoSidebarStoreIcon,
  B2BCeoSidebarNewsIcon,
  B2BCeoSidebarReqularIcon,
  B2BCeoSidebarDeviceIcon,
  B2BCeoSidebarRewardIcon,
  B2BCeoSidebarStatisticsIcon,
} from '@repo/design-system/icons';

import DrawerMenuSection from '../Home/DrawerMenuSection';

// 아이콘 컴포넌트를 메모이제이션
const MenuIcons = {
  store: B2BCeoSidebarStoreIcon,
  news: B2BCeoSidebarNewsIcon,
  regular: B2BCeoSidebarReqularIcon,
  reward: B2BCeoSidebarRewardIcon,
  statistics: B2BCeoSidebarStatisticsIcon,
  devices: B2BCeoSidebarDeviceIcon,
} as const;

// 메뉴 아이템을 컴포넌트 외부로 이동하여 매번 재생성 방지
const createMenuItems = () => [
  {
    id: 'store',
    text: '매장 정보 관리',
    path: '/my/store/basic',
    iconType: 'store' as const,
    subItems: [
      { id: '/my/store/basic', text: '기본정보', path: '/my/store/basic' },
      { id: '/my/store/additional', text: '부가정보', path: '/my/store/additional' },
      { id: '/my/store/menus', text: '메뉴', path: '/my/store/menus' },
      { id: '/my/store/seatGuide', text: '영업시간/휴뮤일', path: '/my/store/seatGuide' },
      { id: '/my/store/photo', text: '사진', path: '/my/store/photo' },
    ],
  },

  {
    id: 'regular',
    text: '고객관리',
    path: '/my/regular/news',
    iconType: 'regular' as const,
    subItems: [
      { id: '/my/regular/news', text: '소식', path: '/my/regular/news' },
      { id: '/my/regular/favorite', text: '단골', path: '/my/regular/favorite' },
      { id: '/my/regular/review', text: '리뷰', path: '/my/regular/review' },
    ],
  },
  {
    id: 'reward',
    text: '리워드 · 쿠폰',
    path: '/my/reward',
    iconType: 'reward' as const,
    subItems: [
      { id: '/my/reward/point', text: '적립', path: '/my/reward/point' },
      { id: '/my/reward/coupon', text: '쿠폰', path: '/my/reward/coupon' },
      { id: '/my/reward/pointshop', text: '포인트 샵', path: '/my/reward/pointshop' },
    ],
  },
  {
    id: 'statistics',
    text: '통계',
    path: '/my/statistics',
    iconType: 'statistics' as const,
  },
  {
    id: 'devices',
    text: '기기관리',
    path: '/my/devices',
    iconType: 'devices' as const,
  },
];

interface SideLayoutProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SideLayout = ({ isOpen, onClose }: SideLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 모든 로직을 인라인으로 처리
  const allMenuItems = createMenuItems();
  const activeMenu = (() => {
    for (const menu of allMenuItems) {
      if (menu.subItems) {
        const activeSubItem = menu.subItems.find(
          (subItem) => pathname === subItem.path || pathname.startsWith(subItem.path),
        );
        if (activeSubItem) return { menu, subItem: activeSubItem };
      } else if (pathname === menu.path || pathname.startsWith(menu.path)) {
        return { menu, subItem: null };
      }
    }
    return null;
  })();

  const activeMenuId = activeMenu?.menu.id || null;

  // 초기 상태를 URL 기반으로 설정하여 서버/클라이언트 일치
  const getInitialExpandedMenus = () => {
    const initialSet = new Set<string>();
    if (activeMenu?.menu.id && activeMenu.menu.subItems) {
      initialSet.add(activeMenu.menu.id);
    }
    return initialSet;
  };

  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(getInitialExpandedMenus);

  const menuItems = createMenuItems().map((menu) => {
    const IconComponent = MenuIcons[menu.iconType];
    return {
      ...menu,
      icon: <IconComponent size={20} stroke={activeMenuId === menu.id ? '#ff2b3d' : '#111111'} />,
    };
  });

  return (
    <>
      {isOpen && (
        <div
          className='fixed top-[64px] left-0 right-0 bottom-0 bg-black opacity-50 z-30 lg:hidden'
          onClick={(e) => e.target === e.currentTarget && onClose?.()}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:transition-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className='w-[250px] md:w-[280px] lg:w-[240px] h-full pt-[64px] lg:pt-0'>
          <DrawerMenuSection
            className='border-r border-gray-8 bg-white h-full'
            menuList={menuItems}
            onMenuClick={(menu) => {
              // 하위 메뉴가 있으면 펼치기/접기, 없으면 페이지 이동
              if (menu.subItems && menu.subItems.length > 0) {
                setExpandedMenus((prev) => {
                  const newSet = new Set(prev);
                  if (newSet.has(menu.id)) {
                    newSet.delete(menu.id);
                  } else {
                    newSet.add(menu.id);
                  }
                  return newSet;
                });
              } else {
                router.push(menu.path);
                onClose?.();
              }
            }}
            onSubMenuClick={(menu) => {
              router.push(menu.path);
              onClose?.();
            }}
            activeMenu={activeMenu}
            expandedMenus={expandedMenus}
          />
        </div>
      </div>
    </>
  );
};

export default SideLayout;
