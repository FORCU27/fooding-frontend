'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { NextPage } from 'next';
import ApplicationForm from '@/components/Application/ApplicationForm';
import { Application, applicationRepository } from '@/repository/application-repository'

const ApplicationCreateScreen: NextPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handleApplicationListClick = () => {
    router.push('/applications');
  };

  const handleSubmit = async (data: Application) => {
    try {
      await applicationRepository.create(data);
      setNotification({
        open: true,
        message: '앱이 성공적으로 생성되었습니다.',
        severity: 'success',
      });
      router.push('/applications');
    } catch (error) {
      setNotification({
        open: true,
        message: '앱 생성 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: isMoblie ? 1 : 3 }}>
      <ApplicationForm handleSubmit={handleSubmit} handleBackClick={handleApplicationListClick} />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleNotificationClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ApplicationCreateScreen;
