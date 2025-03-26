'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import useSWR from 'swr';

import ProjectForm from '@/components/Project/ProjectForm';
import { Project, projectRepository } from '@/repository/project-repository';

export default function ProjectUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['project', idValue], () =>
    projectRepository.getById(idValue),
  );

  const handleSubmit = async (formData: Project) => {
    try {
      await projectRepository.update(idValue, {
        ...formData,
        createdDate: data?.createdDate || new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: '프로젝트가 성공적으로 수정되었습니다.',
        severity: 'success',
      });
      router.push(`/projects/${idValue}`);
    } catch (error) {
      setNotification({
        open: true,
        message: '프로젝트 수정 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading portfolio</div>;
  }

  const handleProjectListClick = () => {
    router.push('/projects');
  };

  const handleSnackbarClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      {data && (
        <ProjectForm
          handleSubmit={handleSubmit}
          handleBackClick={handleProjectListClick}
          editOriginValue={{ ...data }}
        />
      )}
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
