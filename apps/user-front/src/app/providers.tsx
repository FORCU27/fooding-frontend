'use client';

import { LoginBottomSheetProvider } from '@/components/Auth/LoginBottomSheet';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ReactQueryProvider } from '@/components/Provider/ReactQueryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <LoginBottomSheetProvider>{children}</LoginBottomSheetProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};
