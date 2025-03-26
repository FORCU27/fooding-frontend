import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import { useAuth } from '@/libs/auth';

interface Props {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const drawerWidth = 240;

const AppBarSection = ({
  isDrawerOpen,
  handleDrawerToggle,
  handleDrawerOpen,
  handleDrawerClose,
}: Props) => {
  const { user } = useAuth();

  return (
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
      {user && (
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
      )}
    </AppBar>
  );
};

export default AppBarSection;
