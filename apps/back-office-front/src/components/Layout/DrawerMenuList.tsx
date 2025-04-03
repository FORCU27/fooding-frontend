'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Login } from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
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

interface DrawerMenuListProps {
  menuList: MenuItem[];
}

const DrawerMenuList = ({ menuList }: DrawerMenuListProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmenuClick = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  return (
    <Box component='div'>
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
          FOODING
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>
          회원정보를 찾을 수 없습니다.
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2 }}>
          로그인이 필요합니다.
        </Typography>
        <Button
          variant='outlined'
          size='small'
          startIcon={<Login />}
          onClick={() => router.push('/login')}
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
          로그인
        </Button>
      </Toolbar>
      <List>
        {menuList.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => item.subMenus && handleSubmenuClick(item.id)}>
                <ListItemIcon sx={{ color: 'text.primary' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'text.primary' }} />
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
                      <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ListItemText
                          primary={subItem.text}
                          primaryTypographyProps={{
                            sx: { textAlign: 'center', color: 'text.primary' },
                          }}
                          sx={{ textAlign: 'center' }}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DrawerMenuList;
