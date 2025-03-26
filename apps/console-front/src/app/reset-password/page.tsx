'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';

import ResetPasswordForm from '@/components/ResetPassword/ResetPasswordForm';
import { UserType } from '@/repository/auth-repository';

interface NotificationType {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export default function ResetPasswordPage() {
  const [notification, setNotification] = useState<NotificationType>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // URL에서 토큰 추출
    const tokenFromURL = searchParams.get('token');
    setToken(tokenFromURL);
  }, [searchParams]);

  const handleFormSubmit = async (data: UserType) => {
    if (!token) {
      alert('유효하지 않은 요청입니다. 다시 시도해주세요.');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: data.password,
          verificationCode: token,
          email: data.email,
        }),
      });

      if (response.ok) {
        router.push('/reset-password/complete');
      } else {
        const error = await response.json();
        setNotification({
          open: true,
          message: error?.message?.message || '서버에서 알 수 없는 오류가 발생했습니다.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('API 요청 처리 중 오류 발생:', error);
      setNotification({
        open: true,
        message: '서버 내부 오류',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

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
          sx={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            p: 5,
          }}
        >
          <Typography component='h1' variant='h5' sx={{ fontWeight: 800 }}>
            비밀번호 재설정
          </Typography>
          <ResetPasswordForm handleSubmit={handleFormSubmit} />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notification.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant='filled'
          sx={{ width: '100%', color: '#FFFFFF' }}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
