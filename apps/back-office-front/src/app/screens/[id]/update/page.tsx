'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import useSWR from 'swr';

import ScreenForm from '@/components/Screen/ScreenForm';
import { Screen, screenRepository } from '@/repository/screen-repository';

export default function ScreenUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const idValue = typeof id === 'string' ? id : '';

  const { data, isLoading, error } = useSWR(['screen', idValue], () =>
    screenRepository.getById(idValue),
  );

  const handleSubmit = async (formData: Screen) => {
    try {
      await screenRepository.update(idValue, {
        ...formData,
        createdDate: data?.createdDate || new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: '스크린이 성공적으로 수정되었습니다.',
        severity: 'success',
      });
      router.push(`/screens/${id}`);
    } catch (error) {
      setNotification({
        open: true,
        message: '스크린 수정 중 오류가 발생했습니다.',
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

  const handleScreenListClick = () => {
    router.push(`/screens/${id}`);
  };

  const handleSnackbarClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      {data && (
        <ScreenForm
          handleSubmit={handleSubmit}
          handleBackClick={handleScreenListClick}
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
