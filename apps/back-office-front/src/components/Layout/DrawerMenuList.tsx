'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { MenuItem } from './AdminLayout';
import { useAuth } from '@/libs/auth';

interface DrawerMenuListProps {
  menuList: MenuItem[];
}

const DrawerMenuList = ({ menuList }: DrawerMenuListProps) => {
  const { user, logout } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuClick = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  if (!user) return;

  return (
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
        <Typography variant='subtitle1' sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>
          {user?.nickname || '사용자'}
        </Typography>
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
      </Toolbar>
      <List>
        {menuList.map((item) => (
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
};

export default DrawerMenuList;
