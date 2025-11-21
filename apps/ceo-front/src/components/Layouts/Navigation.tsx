'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  B2BCeoSidebarStoreIcon,
  B2BCeoSidebarReqularIcon,
  B2BCeoSidebarDeviceIcon,
  B2BCeoSidebarRewardIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@repo/design-system/icons';
import { cn, createContext } from '@repo/design-system/utils';

export const allMenus: Menu[] = [
  {
    type: 'group',
    id: 'store',
    label: '매장 정보 관리',
    path: '/my/store/basic',
    icon: <B2BCeoSidebarStoreIcon size={20} />,
    items: [
      { label: '기본정보', path: '/my/store/basic' },
      { label: '부가정보', path: '/my/store/additional' },
      { label: '메뉴', path: '/my/store/menus' },
      { label: '영업시간/휴뮤일', path: '/my/store/seatGuide' },
      { label: '사진', path: '/my/store/photo' },
    ],
  },
  {
    type: 'group',
    id: 'regular',
    label: '고객관리',
    path: '/my/regular/news',
    icon: <B2BCeoSidebarReqularIcon size={20} />,
    items: [
      { label: '소식', path: '/my/regular/news' },
      { label: '단골', path: '/my/regular/favorite' },
      { label: '리뷰', path: '/my/regular/review' },
    ],
  },
  {
    type: 'group',
    id: 'reward',
    label: '리워드 · 쿠폰',
    path: '/my/reward',
    icon: <B2BCeoSidebarRewardIcon size={20} />,
    items: [
      { label: '적립', path: '/my/reward/point' },
      { label: '쿠폰', path: '/my/reward/coupon' },
      { label: '포인트 샵', path: '/my/reward/pointshop' },
    ],
  },
  // {
  //   type: 'link',
  //   id: 'statistics',
  //   label: '통계',
  //   path: '/my/statistics',
  //   icon: <B2BCeoSidebarStatisticsIcon size={20} />,
  // },
  {
    type: 'link',
    id: 'devices',
    label: '기기관리',
    path: '/my/devices',
    icon: <B2BCeoSidebarDeviceIcon size={20} />,
  },
];

type NavigationProps = {
  className?: string;
  onNavigation?: () => void;
};

export const Navigation = ({ className, onNavigation = () => {} }: NavigationProps) => {
  return (
    <NavigationContext value={{ onNavigation }}>
      <nav className={cn('py-8 w-full h-full bg-white overflow-y-auto scrollbar-hide', className)}>
        <ul className='flex flex-col'>
          {allMenus.map((menu) => {
            switch (menu.type) {
              case 'group':
                return <MenuGroup key={menu.id} menu={menu} />;
              case 'link':
                return <MenuLink key={menu.id} menu={menu} />;
              default:
                menu satisfies never;
            }
          })}
        </ul>
      </nav>
    </NavigationContext>
  );
};

type MenuGroupProps = {
  menu: Extract<Menu, { type: 'group' }>;
};

const MenuGroup = ({ menu }: MenuGroupProps) => {
  const pathname = usePathname();

  const hasActiveGroupItem: boolean = (() => {
    for (const menuItem of allMenus) {
      if (menuItem.type === 'group') {
        const hasActiveGroupItem = menu.items.some((subItem) => pathname.startsWith(subItem.path));

        if (hasActiveGroupItem) {
          return true;
        }
      }
    }

    return false;
  })();

  const [expanded, setExpanded] = useState(hasActiveGroupItem);

  return (
    <div className='flex flex-col'>
      <button
        className={cn(
          'flex h-14 px-8 items-center cursor-pointer justify-between',
          hasActiveGroupItem && 'bg-primary-pink/5 text-primary-pink',
          !hasActiveGroupItem && 'hover:bg-gray-7',
        )}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className='flex items-center flex-1'>
          {menu.icon}
          <span className='ml-2'>{menu.label}</span>
        </div>
        {expanded ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
      </button>
      {expanded && (
        <ul className='flex flex-col'>
          {menu.items.map((item) => (
            <MenuGroupItem key={item.path} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

type MenuLinkProps = {
  menu: Extract<Menu, { type: 'link' }>;
};

const MenuLink = ({ menu }: MenuLinkProps) => {
  const pathname = usePathname();

  const { onNavigation } = useNavigationContext();

  const isActive = pathname.startsWith(menu.path);

  return (
    <Link
      href={menu.path}
      className={cn(
        'h-14 px-8 items-center flex cursor-pointer body-2',
        isActive && 'bg-primary-pink/5 text-primary-pink',
        !isActive && 'hover:bg-gray-7',
      )}
      onClick={onNavigation}
    >
      {menu.icon}
      <span className='ml-2'>{menu.label}</span>
    </Link>
  );
};

type MenuGroupItemProps = {
  item: MenuGroupItem;
};

const MenuGroupItem = ({ item }: MenuGroupItemProps) => {
  const pathname = usePathname();

  const { onNavigation } = useNavigationContext();

  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={cn(
        'px-15 flex items-center cursor-pointer text-gray-5 body-2 h-[43px] hover:bg-gray-7',
        isActive && 'text-black',
      )}
      onClick={onNavigation}
    >
      {item.label}
    </Link>
  );
};

type MenuGroupItem = {
  label: string;
  path: string;
};

type MenuGroup = {
  type: 'group';
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  items: MenuGroupItem[];
};

type MenuLink = {
  type: 'link';
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
};

export type Menu = MenuGroup | MenuLink;

type NavigationContextValue = {
  onNavigation: () => void;
};

const [NavigationContext, useNavigationContext] =
  createContext<NavigationContextValue>('Navigation');
