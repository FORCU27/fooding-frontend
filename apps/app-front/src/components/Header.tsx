'use client';

import { Box } from '@mui/material';

interface HeaderProps {
  theme?: 'light' | 'dark';
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function Header(props: HeaderProps) {
  return <Box></Box>;
}

export default Header;
