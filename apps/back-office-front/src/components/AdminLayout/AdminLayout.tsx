'use client';

import Link from 'next/link';
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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/libs/auth';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const { user, logout } = useAuth();

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
        <Typography
          variant='subtitle2'
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 1,
          }}
        >
          HYPERX
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            color: 'text.primary',
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          {user?.nickname || '사용자'}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
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
            sx={{
              mr: 2,
              display: { sm: 'none' },
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color='primary'
            onClick={isDrawerOpen ? handleDrawerClose : handleDrawerOpen}
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'block' },
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              letterSpacing: '-0.5px',
            }}
          >
            BACK-OFFICE
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
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
          {drawer}
        </Drawer>

        <Drawer
          variant='persistent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
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
          height: '100vh',
          overflow: 'auto',
          backgroundColor: '#fff',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
