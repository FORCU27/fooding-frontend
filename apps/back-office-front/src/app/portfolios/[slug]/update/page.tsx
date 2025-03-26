'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import useSWR from 'swr';

import PortfolioForm from '@/components/Portfolio/PortfolioForm';
import { Portfolio, portfolioRepository } from '@/repository/portfolio-repository';

export default function PortfolioUpdatePage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const slugValue = typeof slug === 'string' ? slug : '';

  const { data, isLoading, error } = useSWR(['portfolio', slugValue], () =>
    portfolioRepository.getById(slugValue),
  );

  const handleSubmit = async (formData: Portfolio) => {
    try {
      await portfolioRepository.update(slugValue, {
        ...formData,
        createdDate: data?.createdDate || new Date().toISOString(),
      });
      setNotification({
        open: true,
        message: '포트폴리오가 성공적으로 수정되었습니다.',
        severity: 'success',
      });
      router.push(`/portfolios/${slug}`);
    } catch (error) {
      setNotification({
        open: true,
        message: '포트폴리오 수정 중 오류가 발생했습니다.',
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

  const handlePortfolioListClick = () => {
    router.push('/portfolios');
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Wrapper>
      {data && (
        <PortfolioForm
          handleSubmit={handleSubmit}
          handleBackClick={handlePortfolioListClick}
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
  display: flex;
  flex-direction: column;
`;
