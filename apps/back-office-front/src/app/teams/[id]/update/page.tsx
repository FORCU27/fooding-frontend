'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import useSWR from 'swr';

import TeamForm from '@/components/Team/TeamForm';
import { Team, teamRepository } from '@/repository/team-repository';

export default function TeamUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['team', idValue], () =>
    teamRepository.getById(idValue),
  );

  const handleSubmit = async (formData: Team) => {
    try {
      await teamRepository.update(idValue, {
        ...formData,
        createdDate: data?.createdDate || new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: '팀이 성공적으로 수정되었습니다.',
        severity: 'success',
      });
      router.push(`/teams/${id}`);
    } catch (error) {
      setNotification({
        open: true,
        message: '팀 수정 중 오류가 발생했습니다.',
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

  const handleTeamListClick = () => {
    router.push('/teams');
  };

  const handleSnackbarClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      {data && (
        <TeamForm
          handleSubmit={handleSubmit}
          handleBackClick={handleTeamListClick}
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
