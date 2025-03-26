import React, { useState, useEffect } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, createTheme, ThemeProvider } from '@mui/material';

import AppBarSection from './AppBarSection';
import DrawerSection from './DrawerSection';
import { useAuth } from '@/libs/auth';

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
    id: 'sales',
    text: '프로젝트',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/projects' }],
  },
  {
    id: 'portfolios',
    text: '포트폴리오',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/portfolios' }],
  },
  {
    id: 'clients',
    text: '고객문의',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/clients' }],
  },
  {
    id: 'teams',
    text: '팀',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/teams' }],
  },
  {
    id: 'applications',
    text: '앱',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/applications' }],
  },
  {
    id: 'screens',
    text: '스크린',
    icon: <AttachMoneyIcon />,
    subMenus: [{ text: '목록', path: '/screens' }],
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  const theme = createTheme({
    typography: {
      fontFamily: '"Pretendard", sans-serif',
    },
  });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (!user) return setIsDrawerOpen(false);
    if (user) return setIsDrawerOpen(true);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBarSection
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <DrawerSection
          isDrawerOpen={isDrawerOpen}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerClose={handleDrawerClose}
          menuList={menuItems}
        >
          {children}
        </DrawerSection>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
