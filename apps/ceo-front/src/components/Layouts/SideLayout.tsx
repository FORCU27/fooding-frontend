'use client';

import { useRouter, usePathname } from 'next/navigation';

import {
  B2BCeoSidebarStoreIcon,
  B2BCeoSidebarNewsIcon,
  B2BCeoSidebarReqularIcon,
  B2BCeoSidebarDeviceIcon,
  B2BCeoSidebarRewardIcon,
  B2BCeoSidebarStatisticsIcon,
} from '@repo/design-system/icons';

import { MenuItem } from '../../types/layout';
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
const createMenuItems = (activeMenuId: string | null) => [
  {
    id: 'store',
    text: '매장 정보 관리',
    path: '/store/basic',
    iconType: 'store' as const,
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
    iconType: 'news' as const,
  },
  {
    id: 'regular',
    text: '단골',
    path: '/regular',
    iconType: 'regular' as const,
  },
  {
    id: 'reward',
    text: '리워드 · 쿠폰',
    path: '/reward',
    iconType: 'reward' as const,
    subItems: [
      { id: '/reward/point', text: '적립', path: '/reward/point' },
      { id: '/reward/coupon', text: '쿠폰', path: '/reward/coupon' },
      { id: '/reward/pointshop', text: '포인트샵', path: '/reward/pointshop' },
    ],
  },
  {
    id: 'statistics',
    text: '통계',
    path: '/statistics',
    iconType: 'statistics' as const,
  },
  {
    id: 'devices',
    text: '기기관리',
    path: '/devices',
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
  const allMenuItems = createMenuItems(null);
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
  const menuItems = createMenuItems(activeMenuId).map((menu) => {
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
              router.push(menu.path);
              onClose?.();
            }}
            onSubMenuClick={(menu) => {
              router.push(menu.path);
              onClose?.();
            }}
            activeMenu={activeMenu}
          />
        </div>
      </div>
    </>
  );
};

export default SideLayout;
