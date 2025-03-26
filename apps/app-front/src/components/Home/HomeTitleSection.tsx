'use client';

import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

interface SectionProps {
  className?: string;
}

const HomeTitleSection = ({ className }: SectionProps) => {
  const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL;

  console.log(consoleUrl);

  const handleContactClick = () => {
    window.location.href = `${consoleUrl}/login`;
  };

  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      className={className}
      component='div'
      maxWidth='lg'
      sx={{
        maxWidth: isMoblie ? '100%' : 'lg',
        height: '80vh',
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
          height: '100%',
          p: isMoblie ? 2 : 4,
        }}
      >
        <Button
          variant='outlined'
          size='large'
          sx={{
            borderRadius: '25px',
            fonFamily: 'esamanru',
            fontSize: 16,
            fontWeight: 600,
            mb: 8,
          }}
          onClick={handleContactClick}
        >
          클릭 한 번에 앱 개발이 가능
        </Button>
        <Typography
          variant='h5'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            fontWeight: 800,
            fontSize: { xs: 24, sm: 36, md: 48 },
            p: isMoblie ? 0 : 4,
            m: 8,
          }}
        >
          <p>
            <Typography
              component='span'
              variant='h5'
              sx={{ color: '#0059ff', fontWeight: 800, fontSize: { xs: 24, sm: 36, md: 48 } }}
            >
              손쉬운{' '}
            </Typography>
            앱개발의 모든 것
          </p>
          <p>앱 개발, 출시, 인프라, 마케팅까지</p>
        </Typography>
        <Button
          size='large'
          sx={{
            minWidth: '250px',
            backgroundColor: '#0059ff',
            fontSize: '20px',
            fontWeight: '600',
            borderRadius: '25px',
            color: '#ffffff',
          }}
          onClick={handleContactClick}
        >
          시작하기
        </Button>
      </Container>
    </Box>
  );
};

export default HomeTitleSection;
