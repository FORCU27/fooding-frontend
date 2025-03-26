import React from 'react';

import { Box, Toolbar } from '@mui/material';

interface Props {
  isDrawerOpen: boolean;
  children: React.ReactNode;
}

const drawerWidth = 240;

const MainContent = ({ isDrawerOpen, children }: Props) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#fff',
      overflow: 'hidden',
      transition: (theme) =>
        theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      width: { sm: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)` },
      ml: { sm: isDrawerOpen ? `${drawerWidth}px` : 0 },
    }}
  >
    <Toolbar />
    {children}
  </Box>
);

export default MainContent;
