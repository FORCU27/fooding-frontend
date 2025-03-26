'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import { Box, Container, Typography, Button } from '@mui/material';

export default function ResetPasswordConfirmPage() {
  const router = useRouter();

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
            이메일 전송 완료
          </Typography>
          <Typography component='p' sx={{ color: '#CDCDCD', mt: 3, mb: 3 }}>
            비밀번호 재설정 링크가 귀하의 이메일로 전송되었습니다.
            <br />
            이메일을 확인하고 링크를 클릭해주세요.
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
          <StyledLink
            href={'/reset-password/request'}
            style={{ textAlign: 'center', color: '#999999' }}
          >
            이메일 다시 요청하기
          </StyledLink>
        </Box>
      </Box>
    </Container>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
