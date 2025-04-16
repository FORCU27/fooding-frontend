import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from '@mui/material';

interface Props {
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const AppBarSection = ({ handleDrawerToggle }: Props) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedStore, setSelectedStore] = React.useState('강고기 홍대점');

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (store?: string) => {
    if (store) setSelectedStore(store);
    setAnchor(null);
  };

  const stores = ['강고기 홍대점', '강고기 제주도점', '강고기 사당점'];

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        width: { sm: '100%' },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color='primary'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box display='flex' alignItems='center'>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              ml: 2,
            }}
          >
            {selectedStore}
          </Typography>

          <IconButton onClick={handleOpen} size='small' sx={{ ml: 0.5 }}>
            <ExpandMoreIcon />
          </IconButton>

          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => handleClose()}
            elevation={1}
            PaperProps={{
              sx: {
                p: 1,
                backgroundColor: '#D9D9D9',
              },
            }}
          >
            {stores.map((store) => (
              <MenuItem key={store} onClick={() => handleClose(store)} sx={{ m: 1 }}>
                {store}
              </MenuItem>
            ))}
            <Button
              variant='outlined'
              size='large'
              fullWidth
              startIcon={<AddIcon />}
              sx={{ backgroundColor: '#FFFFFF', border: 'none', color: '#111111', fontWeight: 600 }}
            >
              매장 생성하기
            </Button>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarSection;
