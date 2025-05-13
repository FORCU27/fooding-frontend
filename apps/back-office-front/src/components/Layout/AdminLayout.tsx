'use client';

import Link from 'next/link';
import React from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
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
  Divider,
} from '@mui/material';

const menu = [
  {
    label: '매장 관리',
    sub: [
      { label: '가게 관리', path: '/stores' },
    ],
  },
];

function Sidebar() {
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({ '매장 관리': true });
  const [active, setActive] = React.useState<string>('가게 관리');

  // TODO: Replace with real user info
  const user = { name: '홍길동', email: 'admin@fooding.com' };

  const handleClick = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          background: '#18191c',
          color: '#fff',
          borderRight: '1px solid #232429',
        },
      }}
    >
      <Box sx={{ px: 2, pt: 3, pb: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Link href="/" passHref legacyBehavior>
          <Typography
            variant="h6"
            component="a"
            sx={{
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
              mb: 1,
              cursor: 'pointer',
              '&:hover': { color: '#1976d2' },
            }}
          >
            Fooding 관리자
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: '#b0b3b8', mb: 0.5 }}>
          {user.name}
        </Typography>
        <Typography variant="caption" sx={{ color: '#b0b3b8', mb: 1 }}>
          {user.email}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          sx={{ alignSelf: 'stretch', borderColor: '#232429', color: '#b0b3b8', mb: 1, '&:hover': { borderColor: '#1976d2', color: '#1976d2' } }}
          onClick={() => alert('로그아웃!')}
        >
          로그아웃
        </Button>
      </Box>
      <Divider sx={{ background: '#232429', mb: 1 }} />
      <Box sx={{ overflow: 'auto', pt: 1 }}>
        <List>
          {menu.map((item) =>
            item.sub ? (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => handleClick(item.label)}
                  sx={{
                    color: '#fff',
                    '&:hover': { background: '#232429' },
                    background: open[item.label] ? '#232429' : 'inherit',
                  }}
                >
                  <ListItemText primary={item.label} />
                  {open[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.sub.map((sub) => (
                      <Link href={sub.path} key={sub.label} passHref legacyBehavior>
                        <ListItemButton
                          component="a"
                          sx={{
                            pl: 4,
                            color: active === sub.label ? '#1976d2' : '#b0b3b8',
                            background: active === sub.label ? 'rgba(25, 118, 210, 0.12)' : 'inherit',
                            '&:hover': {
                              color: '#1976d2',
                              background: 'rgba(25, 118, 210, 0.08)',
                            },
                          }}
                          onClick={() => setActive(sub.label)}
                        >
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
    </Drawer>
  );
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#18191c' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, background: '#232429', minHeight: '100vh' }}>
        <AppBar position="static" elevation={1} sx={{ background: '#232429', color: '#fff', borderBottom: '1px solid #232429' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              매장 관리 - 가게 관리
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
