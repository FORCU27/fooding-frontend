'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Container, Typography, Button } from '@mui/material';

export default function JoinConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nicknameEncoded = searchParams.get('nickname') || '';
  const nickname = decodeURIComponent(nicknameEncoded);

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component='div'
          sx={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography component='h1' variant='h5' align='center' sx={{ fontWeight: 800 }}>
            회원가입 완료
          </Typography>
          <Typography component='p' sx={{ color: '#CDCDCD', mt: 3, mb: 3 }}>
            {nickname}님의 회원가입이
            <br />
            성공적으로 완료되었습니다.
          </Typography>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            disableElevation
            sx={{
              mt: 3,
              mb: 3,
              height: '56px',
              backgroundColor: '#FF4938',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '16px',
            }}
            onClick={() => router.push('/')}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
