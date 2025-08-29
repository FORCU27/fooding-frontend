'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { 
  Dashboard, 
  Logout, 
  People, 
  Store, 
  Business, 
  AdminPanelSettings, 
  Notifications, 
  Email,
  Article,
  History,
  RateReview,
  Monitor,
  Campaign,
  ContactPage
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Collapse,
  Button,
  ListItemIcon,
  Chip,
} from '@mui/material';

const menu = [
  {
    label: '고객 관리',
    icon: <People />,
    sub: [
      { label: '유저 관리', path: '/users', icon: <People /> },
      { label: '가게 관리', path: '/stores', icon: <Store /> },
      { label: '점주 관리', path: '/ceos', icon: <Business /> },
      { label: '관리자 관리', path: '/managers', icon: <AdminPanelSettings /> },
    ],
  },
  {
    label: '알림',
    icon: <Notifications />,
    sub: [
      { label: '알림 내역', path: '/user-notifications', icon: <History /> },
      { label: '발송 내역', path: '/notifications', icon: <Email /> },
      { label: '템플릿 관리', path: '/notification-templates', icon: <Article /> },
    ],
  },
  {
    label: '모니터링',
    icon: <Monitor />,
    sub: [
      { label: '리뷰', path: '/reviews', icon: <RateReview /> },
    ],
  },
  {
    label: '마케팅',
    icon: <Campaign />,
    sub: [
      { label: 'Lead', path: '/leads', icon: <ContactPage /> },
    ],
  },
];

function Sidebar() {
  const pathname = usePathname();
  
  // 현재 경로를 기반으로 메뉴 상태 초기화
  const getInitialMenuState = useCallback(() => {
    const initialOpen: { [key: string]: boolean } = {};
    let initialActive = '';
    
    // 현재 경로에 해당하는 메뉴 찾기
    for (const menuItem of menu) {
      if (menuItem.sub) {
        const hasActiveSub = menuItem.sub.some(sub => sub.path === pathname);
        if (hasActiveSub) {
          initialOpen[menuItem.label] = true;
          const activeSub = menuItem.sub.find(sub => sub.path === pathname);
          if (activeSub) {
            initialActive = activeSub.label;
          }
        }
      }
    }
    
    return { initialOpen, initialActive };
  }, [pathname]);

  const { initialOpen, initialActive } = getInitialMenuState();
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>(initialOpen);
  const [active, setActive] = React.useState<string>(initialActive);

  // 경로가 변경될 때마다 메뉴 상태 업데이트
  React.useEffect(() => {
    const { initialOpen: newOpen, initialActive: newActive } = getInitialMenuState();
    setOpen(newOpen);
    setActive(newActive);
  }, [pathname, getInitialMenuState]);

  // TODO: Replace with real user info
  const user = { name: '홍길동', email: 'admin@fooding.com' };

  const handleClick = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: 'border-box',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          color: '#1e293b',
          borderRight: '1px solid #e2e8f0',
        },
      }}
    >
      <Box sx={{ 
        px: 3, 
        pt: 4, 
        pb: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderBottom: '1px solid #e2e8f0',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Dashboard sx={{ fontSize: 32, color: '#3b82f6', mr: 1 }} />
          <Typography
            variant="h5"
            component="a"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { color: '#2563eb' },
            }}
            href='/'
          >
            Fooding
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#475569', mb: 0.5, fontWeight: 500 }}>
          {user.name}
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', mb: 2 }}>
          {user.email}
        </Typography>
        <Chip 
          label="관리자" 
          size="small" 
          sx={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.2)', 
            color: '#1e40af',
            fontWeight: 600,
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }} 
        />
      </Box>
      
      <Box sx={{ overflow: 'auto', pt: 1, px: 1 }}>
        <List>
          {menu.map((item) =>
            item.sub ? (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => handleClick(item.label)}
                  sx={{
                    color: '#1e293b',
                    borderRadius: 2,
                    mb: 0.5,
                    '&:hover': { 
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#1e40af'
                    },
                    background: open[item.label] ? 'rgba(59, 130, 246, 0.15)' : 'inherit',
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                  {open[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.sub.map((sub) => (
                      <Link href={sub.path} key={sub.label} style={{ textDecoration: 'none' }}>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            ml: 2,
                            borderRadius: 2,
                            mb: 0.5,
                            color: active === sub.label ? '#1e40af' : '#64748b',
                            background: active === sub.label ? 'rgba(59, 130, 246, 0.15)' : 'inherit',
                            '&:hover': {
                              color: '#1e40af',
                              background: 'rgba(59, 130, 246, 0.1)',
                            },
                          }}
                          onClick={() => setActive(sub.label)}
                        >
                          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            {sub.icon}
                          </ListItemIcon>
                          <ListItemText primary={sub.label} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : null
          )}
        </List>
      </Box>
      
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #e2e8f0' }}>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<Logout />}
          fullWidth
          sx={{ 
            borderColor: '#cbd5e1', 
            color: '#64748b', 
            '&:hover': { 
              borderColor: '#ef4444', 
              color: '#dc2626',
              backgroundColor: 'rgba(239, 68, 68, 0.08)'
            } 
          }}
          onClick={() => alert('로그아웃!')}
        >
          로그아웃
        </Button>
      </Box>
    </Drawer>
  );
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // 현재 경로에 해당하는 메뉴 제목 가져오기
  const getCurrentPageTitle = () => {
    for (const menuItem of menu) {
      if (menuItem.sub) {
        const activeSub = menuItem.sub.find(sub => sub.path === pathname);
        if (activeSub) {
          return `${menuItem.label} - ${activeSub.label}`;
        }
      }
    }
    return '관리자 대시보드';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, background: '#ffffff', minHeight: '100vh' }}>
        <AppBar position="static" elevation={1} sx={{ background: '#ffffff', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {getCurrentPageTitle()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
