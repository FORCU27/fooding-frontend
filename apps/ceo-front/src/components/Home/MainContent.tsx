import React from 'react';

import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 240;
const appBarHeight = 64;

const MainContent = ({ children }: Props) => (
  <Box
    component='main'
    sx={{
      display: 'flex',
      alignContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
      width: { sm: `calc(100vw - ${drawerWidth}px)`, xs: '100%' },
      ml: { sm: `${drawerWidth}px` },
      height: `calc(100vh - ${appBarHeight}px)`,
      mt: `${appBarHeight}px`,
    }}
  >
    {children}
  </Box>
);

export default MainContent;
