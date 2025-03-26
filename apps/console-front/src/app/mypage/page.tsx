'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { useAuth } from '@/libs/auth';

export default function MyPage() {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <Box
      component='main'
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component='div'
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          p: 2,
          minHeight: '500px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5' align='center' sx={{ fontWeight: 800 }}>
          마이페이지
        </Typography>
        <Typography component='p' sx={{ color: '#CDCDCD', mt: 3, mb: 3 }}>
          유저ID: {user?.id}
        </Typography>
        <Box>
          닉네임: {user?.nickname} <br />
          유입경로: {user?.joinPath} <br />
          동의 내역 <br />
          약관동의 : {user?.isTermsAgree ? '동의' : '동의안함'}
          <br />
          마켓팅동의 : {user?.isMarketingAgree ? '동의' : '동의안함'}
          <br />
          개인정보동의 : {user?.isPrivacyAgree ? '동의' : '동의안함'}
          <br />
          가입일: {user?.createdAt && user?.createdAt.toString()}
          <br />
        </Box>
        <Button variant='contained' onClick={() => router.push('/mypage/modifyPassword')}>
          비밀번호 변경
        </Button>
      </Box>
    </Box>
  );
}
