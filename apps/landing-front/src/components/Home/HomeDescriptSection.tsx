'use client';

import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { Box, Button, Container, Grid, useMediaQuery, useTheme } from '@mui/material';

import HomeDescriptCard from './HomeDescriptCard';
interface SectionProps {
  className?: string;
}

const features = [
  {
    title: '제작',
    description: '클릭만으로 비즈니스 앱 제작',
    subtext: '쉽게 앱을 구성하고, 이를 활용해 커스텀 앱을 만드세요',
    gridColumn: { md: '1 / 2', sm: 'auto' },
    gridRow: { md: '1 / 3', sm: 'auto' },
    backgroundImage: '/images/home/home-production.png',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundColor: '#EAF1FF',
  },
  {
    title: '마켓플레이스',
    description:
      '다양한 기능, 멋진 디자인, 복잡한 서버를 마켓플레이스를 통해 설치 후 쉽게 적용 가능',
    subtext: '결제 모듈, 알림 메시지',
    backgroundImage: '/images/home/home-marketplace.png',
    gridColumn: { md: '2 / 4', sm: 'auto' },
    gridRow: { md: '1 / 2', sm: 'auto' },
    backgroundPosition: 'right -10% bottom 55%',
    backgroundSize: '55%',
    backgroundColor: '#D6E3FF',
  },
  {
    title: '파이프라인',
    description: '앱 제작, 출시, 마케팅, 운영까지비즈니스 파이프라인 쉽게 구축 가능',
    backgroundImage: '/images/home/home-pipeline.png',
    gridColumn: { md: '2 / 3', sm: 'auto' },
    gridRow: { md: '2 / 3', sm: 'auto' },
    backgroundPosition: 'right bottom',
    backgroundSize: '50%',
    backgroundColor: '#99BBFF',
  },
  {
    title: '서비스',
    description: '게시판, API, 데이터베이스를 손쉽게 구성 후 서비스 가능',
    subtext: '같이 제공되는 관리자 페이지를 통해 쉽게 관리하세요',
    backgroundImage: '/images/home/home-service.png',
    gridColumn: { md: '1 / 3', sm: 'auto' },
    gridRow: { md: '3 / 4', sm: 'auto' },
    backgroundPosition: 'right  bottom',
    backgroundSize: 'contain',
    backgroundColor: '#D6E3FF',
  },
  {
    title: '마케팅',
    description: '비즈니스',
    subtext: '통합된 마케팅 도구로 유저를 모으고, 모니터링하세요',
    backgroundImage: '/images/home/home-marketing.png',
    gridColumn: { md: '3 / 4', sm: 'auto' },
    gridRow: { md: '2 / 4', sm: 'auto' },
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundColor: '#EAF1FF',
  },
];

const HomeDescriptSection = ({ className }: SectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      className={className}
      component='div'
      maxWidth='lg'
      sx={{
        maxWidth: isMobile ? '100%' : 'lg',
        minHeight: '100vh',
        p: isMobile ? 1 : 4,
        m: '0 auto',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: isMobile ? 2 : 4,
        }}
      >
        <Button
          className='descript-section__button'
          size='small'
          variant='outlined'
          sx={{ fontWeight: 800, fontSize: 14, mb: 2 }}
          startIcon={<WebRoundedIcon sx={{ color: '#3377ff' }} />}
        >
          주요기능
        </Button>

        <Box sx={{ p: isMobile ? 1 : 3 }}>
          <Grid
            container
            sx={{
              display: 'grid',
              maxWidth: '916px',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
              aspectRatio: isMobile ? '' : '1 / 1',
              gap: isMobile ? 2 : 3,
              alignItems: 'stretch',
            }}
          >
            {features.map((feature, index) => (
              <Grid
                item
                key={index}
                sx={{
                  gridColumn: feature.gridColumn,
                  gridRow: feature.gridRow,
                  backgroundPosition: feature.backgroundPosition,
                  backgroundSize: feature.backgroundSize,
                  display: 'flex',
                  height: '100%',
                }}
              >
                <HomeDescriptCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeDescriptSection;
