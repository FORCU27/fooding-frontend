import { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { LoginBottomSheetProvider } from '@/components/Auth/LoginBottomSheet';
import { AuthProvider } from '@/components/Provider/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginBottomSheetProvider>
        <AuthProvider>
          <Suspense>{children}</Suspense>
        </AuthProvider>
      </LoginBottomSheetProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(ui, { wrapper });
};
