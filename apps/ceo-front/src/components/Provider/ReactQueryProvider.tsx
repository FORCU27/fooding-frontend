'use client';

import { ReactNode, useState } from 'react';

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';

export function ReactQueryProvider({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 윈도우 포커스 시 재호출 방지
            refetchOnMount: false, // 마운트 시 재호출 방지
            retry: 1, // 실패 시 재시도 횟수
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}