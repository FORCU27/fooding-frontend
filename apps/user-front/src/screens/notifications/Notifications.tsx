'use client';

import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ErrorBoundary, ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { NotificationList } from './components/NotificationList';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';

export const NotificationListScreen = () => {
  return (
    <Screen header={<Header title='알림' left={<Header.Back />} />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={NotificationErrorFallback} onReset={reset}>
            <Suspense clientOnly>
              <NotificationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Screen>
  );
};

const NotificationErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  return (
    <ErrorFallback className='mt-[240px]'>
      <ErrorFallback.Title>알림 목록을 불러오지 못했어요.</ErrorFallback.Title>
      <ErrorFallback.Actions>
        <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
      </ErrorFallback.Actions>
    </ErrorFallback>
  );
};
