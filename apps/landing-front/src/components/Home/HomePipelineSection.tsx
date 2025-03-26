'use client';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

interface SectionProps {
  className?: string;
}

const HomePipelineSection = ({ className }: SectionProps) => {
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
          startIcon={<SchemaRoundedIcon sx={{ color: '#3377ff' }} />}
          sx={{
            border: '1px solid RGB(155, 155, 155, 0.2)',
            color: '#2b2b2b',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          Zapp 파이프라인
        </Button>
        <Typography
          variant='h6'
          component='p'
          sx={{ fontWeight: 800, fontSize: isMoblie ? 26 : 36 }}
        >
          <span style={{ color: '#3377ff' }}>비즈니스 파이프라인</span>
          <span> 쉽게 구축하세요</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePipelineSection;
