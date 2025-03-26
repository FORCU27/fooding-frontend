'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert, Box, Button, Container, Snackbar, Typography } from '@mui/material';

import { ChevronLeftIcon } from '@/components/Icon';
import JoinForm from '@/components/Join/JoinForm';
import { env } from '@/config';
import { UserType } from '@/repository/auth-repository';

export default function JoinPage() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const router = useRouter();

  const handleFormSubmit = async (data: UserType) => {
    try {
      const formData = {
        ...data,
        joinPath: data.joinPath === 'EMPTY' ? 'NONE' : data.joinPath,
      };

      // API 호출
      const response = await fetch(`${env.publicEnv.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const userNickname = result.nickname;

        router.push(`/join/complete?nickname=${encodeURIComponent(userNickname)}`);
      } else {
        const error = await response.json();
        setNotification({
          open: true,
          message: `폼 제출 중 오류: ${error.message.message || '알 수 없는 오류'}`,
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('폼 제출 중 오류:', error);

      setNotification({
        open: true,
        message: `${error || '알 수 없는 오류'}`,
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
            mt: 3,
            mb: 3,
          }}
        >
          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type='button'
              size='small'
              className='contact-page__prev-button'
              onClick={() => window.history.back()}
            >
              <ChevronLeftIcon
                color='white'
                width={26}
                height={26}
                className='contact-page__prev-icon'
              />
            </Button>
            <Typography component='h1' variant='h5' align='center' sx={{ fontWeight: 800 }}>
              이메일로 가입하기
            </Typography>
          </Box>
          <JoinForm handleSubmit={handleFormSubmit} />
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
