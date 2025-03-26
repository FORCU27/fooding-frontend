'use client';
import styled from '@emotion/styled';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

interface SectionProps {
  className?: string;
}

const HomeProductionSection = ({ className }: SectionProps) => {
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
          startIcon={<SettingsRoundedIcon sx={{ color: '#3377ff' }} />}
          sx={{
            border: '1px solid RGB(155, 155, 155, 0.2)',
            color: '#2b2b2b',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          Zapp 제작
        </Button>
        <Typography
          variant='h6'
          component='p'
          sx={{ fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}
        >
          <span style={{ color: '#3377ff' }}>웹</span>
          <span> 을 통해 쉽게 </span>
          <br style={{ display: isMoblie ? 'block' : 'none' }} />
          <span style={{ color: '#3377ff' }}>앱</span>
          <span> 을 제작하세요</span>
        </Typography>
      </Container>
    </Box>

    // <Wrapper className={className}>
    //   <div className='production-section__content'>
    //     <div className='production-section__title'>
    //       <Button
    //         variant='outlined'
    //         role='button'
    //         startIcon={<SettingsRoundedIcon sx={{ color: '#3377ff' }} />}
    //         sx={{
    //           border: '1px solid RGB(155, 155, 155, 0.2)',
    //           color: '#2b2b2b',
    //           fontWeight: 'bold',
    //         }}
    //       >
    //         Zapp 제작
    //       </Button>
    //       <p className='production-section__title-info'>
    //         <span style={{ color: '#3377ff' }}>웹</span>
    //         <span>을 통해 쉽게</span>
    //         <span style={{ color: '#3377ff', marginLeft: '14px' }}> 앱</span>
    //         <span>을 제작하세요</span>
    //       </p>
    //     </div>
    //   </div>
    // </Wrapper>
  );
};

export default HomeProductionSection;

const Wrapper = styled.section`
  display: flex;
  overflow: hidden;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;

  .production-section__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    margin-bottom: 100px;

    .production-section__title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .production-section__title-info {
        display: flex;
        font-weight: 700;
        font-size: 36px;
        margin: 26px 0 26px;
      }
    }
  }
`;
