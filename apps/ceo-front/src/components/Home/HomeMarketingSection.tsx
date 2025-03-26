'use client';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

interface SectionProps {
  className?: string;
}

const HomeMarketingSection = ({ className }: SectionProps) => {
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className={className}
      component='div'
      maxWidth='lg'
      sx={{
        maxWidth: isMoblie ? '100%' : 'lg',
        minHeight: '100vh',
        p: isMoblie ? 2 : 4,
        m: '0 auto',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          p: isMoblie ? 2 : 4,
          mb: isMoblie ? '20px' : '100px',
        }}
      >
        <Button
          variant='outlined'
          role='button'
          startIcon={<CardTravelOutlinedIcon sx={{ color: '#3377ff' }} />}
          sx={{
            border: '1px solid RGB(155, 155, 155, 0.2)',
            color: '#2b2b2b',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          Zapp 마켓팅
        </Button>
        <Typography
          variant='h6'
          component='p'
          sx={{ fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}
        >
          <span>통합된 </span>
          <span style={{ color: '#3377ff' }}>마켓팅도구</span>
          <span>로 모니터링하세요</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default HomeMarketingSection;
