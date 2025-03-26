'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { NextPage } from 'next';
import ScreenForm from '@/components/Screen/ScreenForm';
import { Screen, screenRepository } from '@/repository/screen-repository';

const ScreenCreateScreen: NextPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScreenListClick = () => {
    router.push('/screens');
  };

  const handleSubmit = async (data: Screen) => {
    try {
      await screenRepository.create(data);
      setNotification({
        open: true,
        message: '스크린이 성공적으로 생성되었습니다.',
        severity: 'success',
      });
      router.push('/screens');
    } catch (error) {
      setNotification({
        open: true,
        message: '스크린 생성 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: isMoblie ? 1 : 3 }}>
      <ScreenForm handleSubmit={handleSubmit} handleBackClick={handleScreenListClick} />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleNotificationClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ScreenCreateScreen;
