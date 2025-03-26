'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Box, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { NextPage } from 'next';

import ProjectForm from '@/components/Project/ProjectForm';
import { Project, projectRepository } from '@/repository/project-repository';

const ProjectCreateScreen: NextPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProjectListClick = () => {
    router.push('/projects');
  };

  const handleSubmit = async (data: Project) => {
    try {
      await projectRepository.create(data);
      setNotification({
        open: true,
        message: '프로젝트가 성공적으로 생성되었습니다.',
        severity: 'success',
      });
      router.push('/projects');
    } catch (error) {
      setNotification({
        open: true,
        message: '프로젝트 생성 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: isMoblie ? 1 : 3 }}>
      <ProjectForm handleSubmit={handleSubmit} handleBackClick={handleProjectListClick} />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleNotificationClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectCreateScreen;
