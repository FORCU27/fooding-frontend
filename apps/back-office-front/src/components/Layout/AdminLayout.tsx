'use client';

import React, { useState } from 'react';

import { ManageAccounts } from '@mui/icons-material';
import { Box } from '@mui/material';

import AppBarSection from './AppBarSection';
import DrawerSection from './DrawerSection';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface SubMenu {
  text: string;
  path: string;
}

export interface MenuItem {
  id: string;
  text: string;
  icon: React.JSX.Element;
  subMenus: SubMenu[];
}

const menuItems: MenuItem[] = [
  {
    id: 'users',
    text: '유저관리',
    icon: <ManageAccounts />,
    subMenus: [{ text: '유저 목록', path: '/users' }],
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
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

export default AdminLayout;
