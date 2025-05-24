'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';

import { NotificationList } from './_components/NotificationList';

export default function NotificationListPage() {
  return (
    <main>
      <ErrorBoundary fallback={null}>
        <Suspense clientOnly>
          <NotificationList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
