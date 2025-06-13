'use client';

import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ErrorBoundary, ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { NotificationList } from './_components/NotificationList';

export default function NotificationListPage() {
  return (
    <main className='bg-white'>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={NotificationErrorFallback} onReset={reset}>
            <Suspense clientOnly>
              <NotificationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}

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
