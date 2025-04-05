'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Box, ListItem, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { MenuItem } from './Layout';

interface DrawerMenuListProps {
  menuList: MenuItem[];
}

const DrawerMenuList = ({ menuList }: DrawerMenuListProps) => {
  const router = useRouter();

  return (
    <Box component='div' sx={{ p: 2 }}>
      <List>
        {menuList.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: 'center',
                  '&:hover': {
                    backgroundColor: item.path ? undefined : 'transparent',
                    cursor: item.path ? 'pointer' : 'default',
                  },
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  if (!item.path) {
                    e.preventDefault();
                    return;
                  }
                  router.push(item.path);
                }}
              >
                <ListItemIcon sx={{ minWidth: 5 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {item.subMenus && (
              <List component='div'>
                {item.subMenus.map((subItem) => (
                  <Link
                    key={subItem.text}
                    href={subItem.path}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DrawerMenuList;
