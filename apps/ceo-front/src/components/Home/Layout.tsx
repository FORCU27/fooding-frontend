'use client';

import React, { useState } from 'react';

import DevicesIcon from '@mui/icons-material/Devices';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/material';

import AppBarSection from './AppBarSection';
import DrawerSection from './DrawerSection';

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
  icon: React.JSX.Element;
  subMenus?: SubMenu[];
}

const menuItems: MenuItem[] = [
  {
    id: 'users',
    text: '매장 정보 관리',
    icon: <HomeIcon />,
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
    icon: <DevicesIcon />,
  },
];

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarSection handleDrawerToggle={handleDrawerToggle} />
      <DrawerSection
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuList={menuItems}
      >
        {children}
      </DrawerSection>
    </Box>
  );
};

export default Layout;
