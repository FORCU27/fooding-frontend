'use client';

import { Button } from '@repo/design-system/components/b2c';
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
          <ErrorBoundary fallback={ErrorFallback} onReset={reset}>
            <Suspense clientOnly>
              <NotificationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Screen>
  );
};

const ErrorFallback = ({ reset }: ErrorBoundaryFallbackProps) => {
  return (
    <div className='mt-[240px] flex flex-col justify-center items-center'>
      <h1 className='text-gray-5'>알림을 불러오지 못했어요.</h1>
      <Button className='mt-4' size='banner' onClick={reset}>
        다시 시도하기
      </Button>
    </div>
  );
};
