import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

interface Props {
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const AppBarSection = ({ handleDrawerToggle }: Props) => {
  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
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
            mr: 2,
            display: { sm: 'none' },
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <MenuIcon />
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
  );
};

export default AppBarSection;
