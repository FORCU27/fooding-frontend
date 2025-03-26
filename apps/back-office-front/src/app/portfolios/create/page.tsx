'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { NextPage } from 'next';

import PortfolioForm from '@/components/Portfolio/PortfolioForm';
import { Portfolio, portfolioRepository } from '@/repository/portfolio-repository';

const PortfolioCreateScreen: NextPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePortfolioListClick = () => {
    router.push('/portfolios');
  };

  const handleSubmit = async (data: Portfolio) => {
    try {
      await portfolioRepository.create(data);
      setNotification({
        open: true,
        message: '포트폴리오가 성공적으로 생성되었습니다.',
        severity: 'success',
      });
      router.push('/portfolios');
    } catch (error) {
      setNotification({
        open: true,
        message: '포트폴리오 생성 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: isMoblie ? 1 : 3 }}>
      <PortfolioForm handleSubmit={handleSubmit} handleBackClick={handlePortfolioListClick} />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default PortfolioCreateScreen;
