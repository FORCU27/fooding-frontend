'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { NextPage } from 'next';

import TeamForm from '@/components/Team/TeamForm';
import { Team, teamRepository } from '@/repository/team-repository'

const TeamCreateScreen: NextPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTeamListClick = () => {
    router.push('/teams');
  };

  const handleSubmit = async (data: Team) => {
    try {
      await teamRepository.create(data);
      setNotification({
        open: true,
        message: '팀이 성공적으로 생성되었습니다.',
        severity: 'success',
      });
      router.push('/teams');
    } catch (error) {
      setNotification({
        open: true,
        message: '팀 생성 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: isMoblie ? 1 : 3 }}>
      <TeamForm handleSubmit={handleSubmit} handleBackClick={handleTeamListClick} />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleNotificationClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamCreateScreen;
