'use client';

import { Toaster } from '@repo/design-system/components/b2c';
import { MSWProvider } from '@repo/msw';
import { OverlayProvider } from 'overlay-kit';

import { LoginBottomSheetProvider } from '@/components/Auth/LoginBottomSheet';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ReactQueryProvider } from '@/components/Provider/ReactQueryProvider';
import { PreferredRegionsProvider } from '@/hooks/regions/usePreferredRegions';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>
        <OverlayProvider>
          <AuthProvider>
            <PreferredRegionsProvider>
              <LoginBottomSheetProvider>{children}</LoginBottomSheetProvider>
            </PreferredRegionsProvider>
          </AuthProvider>
          <Toaster />
        </OverlayProvider>
      </ReactQueryProvider>
    </MSWProvider>
  );
};
