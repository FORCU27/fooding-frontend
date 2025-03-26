'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';

const menuList = [
  {
    label: '주요기능',
    href: '/',
  },
  {
    label: '요금',
    href: '/',
  },
  {
    label: '블로그',
    href: '/',
  },
  {
    label: '고객센터',
    href: '/',
  },
];

interface HeaderProps {
  theme?: 'light' | 'dark';
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

const HideOnScroll = (props: HeaderProps) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
};

function Header(props: HeaderProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));
  const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL;

  console.log(consoleUrl);

  const [openMoblieMenu, setOpenMoblieMenu] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMoblieMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpenMoblieMenu(null);
  };

  const handleLoginBtnClick = () => {
    router.push(`${consoleUrl}/login`);
  };

  return (
    <Box>
      <HideOnScroll {...props}>
        <AppBar
          sx={(theme) => ({
            backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #c5c5c5',
            boxShadow: 0,
          })}
        >
          <Container
            maxWidth='lg'
            sx={{
              maxWidth: isMoblie ? '100%' : 'lg',
            }}
          >
            <Toolbar disableGutters>
              <Box sx={{ display: isMoblie ? 'none' : 'flex' }}>
                <Image src='/images/logo.svg' alt='logo' width={35} height={35} />
              </Box>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  display: isMoblie ? 'none' : 'flex',
                  fontFamily: 'esamanru',
                  fontWeight: 900,
                  fontSize: 24,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  pr: 3,
                }}
              >
                zapp
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: isMoblie ? 'none' : 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  {menuList.map((menu) => (
                    <Button
                      key={menu.label}
                      component='a'
                      href={menu.href}
                      sx={{
                        my: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pt: 1,
                      }}
                    >
                      <Typography sx={{ color: '#1a1a1a', fontWeight: 600, fontSize: 16 }}>
                        {menu.label}
                      </Typography>
                    </Button>
                  ))}
                </Box>
                <Box
                  sx={{
                    my: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1,
                  }}
                >
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={handleLoginBtnClick}
                    sx={{ mr: 2, fontSize: 16, fontWeight: 600, color: '#858585' }}
                  >
                    로그인
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={handleLoginBtnClick}
                    sx={{ background: '#222222', fontSize: 16, fontWeight: 600, color: '#f2f2f2' }}
                  >
                    무료로 시작하기
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: isMoblie ? 'flex' : 'none', pl: 2 }}>
                <Image src='/images/logo.svg' alt='logo' width={35} height={35} />
              </Box>
              <Typography
                variant='h5'
                noWrap
                component='a'
                href='/'
                sx={{
                  display: isMoblie ? 'flex' : 'none',
                  flexGrow: 1,
                  fontFamily: 'esamanru',
                  fontWeight: 800,
                  color: '#1a1a1a',
                  textDecoration: 'none',
                }}
              >
                zapp
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: isMoblie ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  color: '#1a1a1a',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={handleLoginBtnClick}
                    sx={{ mr: 1, fontSize: 14, color: '#858585' }}
                  >
                    로그인
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={handleLoginBtnClick}
                    sx={{ background: '#222222', fontSize: 14, color: '#f2f2f2' }}
                  >
                    무료로 시작하기
                  </Button>
                </Box>
                <IconButton
                  size='large'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  color='inherit'
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={openMoblieMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(openMoblieMenu)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: isMoblie ? 'flex' : 'none' }}
                >
                  {menuList.map((menu) => (
                    <MenuItem
                      key={menu.label}
                      component='a'
                      href={menu.href}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{menu.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Box>
  );
}

export default Header;
