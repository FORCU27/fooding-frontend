'use client';
import Link from 'next/link';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LanguageIcon from '@mui/icons-material/Language';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface SectionProps {
  className?: string;
}

const HomeHubSection = ({ className }: SectionProps) => {
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
          justifyContent: isMoblie ? 'center' : 'space-around',
          alignItems: 'center',
          flexDirection: isMoblie ? 'column' : 'row',
          width: '100%',
          height: 500, //FIXME: 추후 슬라이드 추가
          p: isMoblie ? 2 : 4,
          mb: isMoblie ? '20px' : '100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: isMoblie ? '100%' : '40%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Button
              variant='outlined'
              size='small'
              startIcon={<LanguageIcon sx={{ color: '#3377ff' }} />}
              sx={{
                border: '1px solid RGB(155, 155, 155, 0.2)',
                color: '#2b2b2b',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              zapp 허브
              {/* CHECKLIST: 허브? 마켓플레이스? */}
            </Button>
            <Typography variant='h5' sx={{ fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}>
              <span>
                원하는{' '}
                <Typography
                  component='span'
                  variant='h5'
                  sx={{ color: '#0059ff', fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}
                >
                  솔루션
                </Typography>
                을
              </span>
            </Typography>

            <Typography variant='h5' sx={{ fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}>
              빠르게 탐색하세요
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMoblie ? 'column' : 'row',
              justifyContent: 'center',
            }}
          >
            <Divider
              sx={{
                border: '1px solid #0059ff7a',
                mr: isMoblie ? 0 : 2,
                my: isMoblie ? 2 : 0,
                width: isMoblie ? '100%' : 0,
                height: isMoblie ? 0 : '100%',
              }}
              orientation={isMoblie ? 'horizontal' : 'vertical'}
            />
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                mb: 4,
              }}
            >
              <Typography variant={isMoblie ? 'body2' : 'body1'}>
                ZAPP HUB에 준비된 템플릿을 활용해 바로 시작하세요.
              </Typography>

              <Typography
                component='div'
                sx={{ color: '#0059ff', mt: 1, fontSize: isMoblie ? 14 : 20 }}
              >
                <Link href='/'>
                  ZAPP HUB 바로가기
                  <ArrowOutwardIcon sx={{ fontSize: isMoblie ? 14 : 20, m: '0 0 4px 8px' }} />
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            border: '1px solid black',
            width: isMoblie ? '100%' : '40%',
            height: '80%',
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          슬라이드 영역
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHubSection;
