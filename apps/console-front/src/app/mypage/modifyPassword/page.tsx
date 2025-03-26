'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import ResetPasswordForm from '@/components/ResetPassword/ResetPasswordForm';
import { useAuth } from '@/libs/auth';
import { UserType } from '@/repository/auth-repository';

export default function ModifyPasswordPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleFormSubmit = async (data: UserType) => {
    if (!user) {
      console.error('사용자가 로그인되어 있지 않습니다.');
      return;
    }
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          password: data.password,
        }),
      });

      if (response.ok) {
        router.push('/reset-password/complete');
      }
    } catch (error) {
      console.error('API 요청 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // 또는 로딩 스피너
  }

  return (
    <Box sx={{ width: '90%', display: 'flex', p: 5 }}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          p: 5,
        }}
      >
        <Typography component='h1' variant='h5' sx={{ fontWeight: 800 }}>
          비밀번호 변경
        </Typography>
        {isLoading ? <div>Loading...</div> : <ResetPasswordForm handleSubmit={handleFormSubmit} />}
      </Box>
    </Box>
  );
}
