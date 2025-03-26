'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import useSWR from 'swr';

import ClientForm from '@/components/Client/ClientForm';
import { Client, clientRepository } from '@/repository/client-repository';

export default function ClientUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const { contactId } = params;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const contactIdValue = typeof contactId === 'string' ? contactId : '';

  const { data, isLoading, error } = useSWR(['client', contactIdValue], () =>
    clientRepository.getById(contactIdValue),
  );

  const handleSubmit = async (formData: Client) => {
    try {
      await clientRepository.update(contactIdValue, {
        ...formData,
        createdDate: data?.createdDate || new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: '문의글이 성공적으로 수정되었습니다.',
        severity: 'success',
      });
      router.push(`/clients/${contactId}`);
    } catch (error) {
      setNotification({
        open: true,
        message: '문의글 수정 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading client</div>;
  }

  const handleClientListClick = () => {
    router.push('/clients');
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      {data && (
        <ClientForm
          handleSubmit={handleSubmit}
          handleBackClick={handleClientListClick}
          editOriginValue={{ ...data }}
        />
      )}
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;
