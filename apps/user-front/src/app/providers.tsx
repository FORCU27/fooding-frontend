'use client';

import { MSWProvider } from '@repo/msw';
import { OverlayProvider } from 'overlay-kit';

import { LoginBottomSheetProvider } from '@/components/Auth/LoginBottomSheet';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ReactQueryProvider } from '@/components/Provider/ReactQueryProvider';
import { Toaster } from '@/components/Toaster';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>
        <OverlayProvider>
          <AuthProvider>
            <LoginBottomSheetProvider>{children}</LoginBottomSheetProvider>
          </AuthProvider>
          <Toaster />
        </OverlayProvider>
      </ReactQueryProvider>
    </MSWProvider>
  );
};
