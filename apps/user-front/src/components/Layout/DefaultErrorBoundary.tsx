import { ErrorFallback } from '@repo/design-system/components/b2c';
import { ErrorBoundary } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

export const DefaultErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={
            <ErrorFallback className='flex-1'>
              <ErrorFallback.Title>알 수 없는 에러가 발생했습니다</ErrorFallback.Title>
              <ErrorFallback.Description>잠시 후 다시 시도해 주세요</ErrorFallback.Description>
              <ErrorFallback.Actions>
                <ErrorFallback.Action onClick={reset}>새로고침</ErrorFallback.Action>
              </ErrorFallback.Actions>
            </ErrorFallback>
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
