'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/libs/auth';
import { useThemeContext } from '@/libs/mui/themeContext';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const { user, logout } = useAuth();
  const { setMode } = useThemeContext();
  const theme = useTheme();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmenuClick = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const menuItems = [
    {
      id: 'sales',
      text: '프로젝트',
      icon: <AttachMoneyIcon />,
      subMenus: [{ text: '공고', path: '/projects' }],
    },
  ];

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 2,
          px: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant='subtitle2' sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
          ZAPP
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='subtitle1' sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>
            {user?.nickname || '사용자'}
          </Typography>
          <Button
            variant='outlined'
            size='small'
            sx={{ marginLeft: 2 }}
            onClick={() => router.push('/mypage')}
          >
            마이페이지
          </Button>
        </Box>
        <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2 }}>
          {user?.email || 'email@example.com'}
        </Typography>
        <Button
          variant='outlined'
          size='small'
          startIcon={<LogoutIcon />}
          onClick={logout}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderColor: 'primary.main',
            },
          }}
        >
          로그아웃
        </Button>
        {/* 테마 토글 버튼 추후 주석해제*/}
        {/* <Button
          onClick={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
          sx={{ mt: 1 }}
        >
          테마변경
        </Button> */}
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => item.subMenus && handleSubmenuClick(item.id)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subMenus && (openSubmenu === item.id ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subMenus && (
              <Collapse in={openSubmenu === item.id} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.subMenus.map((subItem) => (
                    <Link
                      key={subItem.text}
                      href={subItem.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  if (!user) {
    return children;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)` },
          ml: { sm: isDrawerOpen ? `${drawerWidth}px` : 0 },
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            color='primary'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color='primary'
            onClick={isDrawerOpen ? handleDrawerClose : handleDrawerOpen}
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'block' },
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
            }}
          >
            {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ color: 'text.primary', fontWeight: 500, letterSpacing: '-0.5px' }}
          >
            ZAPP-CONSOLE
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='persistent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open={isDrawerOpen}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)` },
          height: 'calc(100vh - 64px)',
          marginTop: '64px',
          overflow: 'auto',
          backgroundColor: 'background.default', // 테마 적용
          color: 'text.primary', // 테마 적용
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#333333', // 테마 기반 색상
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'light' ? '#888888' : '#bbbbbb',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.grey[700],
          },
          scrollbarWidth: 'thin',
          scrollbarColor: theme.palette.mode === 'light' ? '#888888 #e0e0e0' : '#bbbbbb #333333',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
