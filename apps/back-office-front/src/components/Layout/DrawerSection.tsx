'use client';

import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import type { MenuItem } from './AdminLayout';
import DrawerMenuList from './DrawerMenuList';
import MainContent from './MainContent';

interface DrawerSectionProps {
  children: ReactNode;
  menuList: MenuItem[];
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const DrawerSection = ({
  children,
  menuList,
  mobileOpen,
  handleDrawerToggle,
}: DrawerSectionProps) => {
  return (
    <>
      <Box sx={{ width: 0 }}>
        <Drawer
          component='nav'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerMenuList menuList={menuList} />
        </Drawer>

        <Drawer
          component='nav'
          variant='persistent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open={true}
        >
          <DrawerMenuList menuList={menuList} />
        </Drawer>
      </Box>
      <MainContent>{children}</MainContent>
    </>
  );
};

export default DrawerSection;
