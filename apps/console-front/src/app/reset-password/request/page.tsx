'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert, Box, Button, Container, Snackbar, Typography } from '@mui/material';

import { ChevronLeftIcon } from '@/components/Icon';
import ResetPasswordRequestForm from '@/components/ResetPassword/Request/ResetPasswordRequestForm';

enum VerificationType {
  IDENTITY_VERIFICATION = 'identityVerification',
  PASSWORD_CHANGE = 'passwordChange',
  PASSWORD_RESET = 'passwordReset',
}

enum VerificationMethod {
  MAIL = 'MAIL',
}
interface NotificationType {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export default function ResetPasswordRequestPage() {
  const [notification, setNotification] = useState<NotificationType>({
    open: false,
    message: '',
    severity: 'success',
  });
  const router = useRouter();

  const handleFormSubmit = async (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email || !emailPattern.test(email)) {
      setNotification({
        open: true,
        message: '유효한 이메일 주소를 입력해 주세요.',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: email,
          verificationType: VerificationType.PASSWORD_RESET,
          method: VerificationMethod.MAIL,
        }),
      });

      if (response.ok) {
        setNotification({
          open: true,
          message: '인증링크가 발송되었습니다. 이메일을 확인해주세요!',
          severity: 'success',
        });

        setTimeout(() => {
          router.push('/reset-password/confirm');
        }, 1500);
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
          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='button' size='small' onClick={() => window.history.back()}>
              <ChevronLeftIcon color='white' width={26} height={26} />
            </Button>
            <Typography component='h1' variant='h5' align='center' sx={{ fontWeight: 800 }}>
              비밀번호 초기화
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography component='p' sx={{ color: '#CDCDCD', mt: 3, mb: 3 }}>
              가입 시 등록했던 이메일로 <br />
              비밀번호를 변경할 수 있는 메일을 보내드릴게요!
            </Typography>
            <ResetPasswordRequestForm handleSubmit={handleFormSubmit} />
          </Box>
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
