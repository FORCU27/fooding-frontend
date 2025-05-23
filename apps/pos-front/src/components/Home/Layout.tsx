'use client';

import React, { useState } from 'react';

import AppBarSection from './AppBarSection';
import DrawerSection from './DrawerSection';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

interface SubMenu {
  text: string;
  path: string;
}

export interface MenuItem {
  id: string;
  text: string;
  path?: string;
  icon?: React.JSX.Element;
  subMenus?: SubMenu[];
}

const menuItems: MenuItem[] = [
  {
    id: 'users',
    text: '매장 정보 관리',
    subMenus: [
      { text: '홈', path: '/users' },
      { text: '소식', path: '/users' },
      { text: '메뉴', path: '/users' },
      { text: '좌석안내', path: '/users' },
      { text: '편의시설', path: '/users' },
    ],
  },
  {
    id: 'clients',
    text: '기기 관리',
    path: '/clients',
  },
];

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  if (isLoginPage) {
    return <div className='min-h-screen'>{children}</div>;
  }

  return (
    <div className='flex'>
      <AppBarSection handleDrawerToggle={handleDrawerToggle} />
      <DrawerSection
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuList={menuItems}
      >
        {children}
      </DrawerSection>
    </div>
  );
};

export default Layout;
