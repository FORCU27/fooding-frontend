import { useState } from 'react';

import { FullscreenBottomSheet } from '@repo/design-system/components/b2c';
import { createContext } from '@repo/design-system/utils';

import { Login } from './Login';

type LoginBottomSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

/**
 * TODO: 인앱 브라우저를 띄워 로그인할 수 있도록 수정
 */
export const LoginBottomSheet = ({ isOpen, onOpenChange }: LoginBottomSheetProps) => {
  return (
    <FullscreenBottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <FullscreenBottomSheet.Content>
        <Login onSuccess={() => onOpenChange(false)} />
      </FullscreenBottomSheet.Content>
    </FullscreenBottomSheet>
  );
};

type LoginBottomSheetContextValue = {
  open: () => void;
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const [LoginBottomSheetContext, useLoginBottomSheetContext] =
  createContext<LoginBottomSheetContextValue>('LoginBottomSheet');

export const useLoginBottomSheet = useLoginBottomSheetContext;

export const LoginBottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const open = () => {
    setIsOpen(true);
  };

  return (
    <LoginBottomSheetContext value={{ isOpen, onOpenChange, open }}>
      {children}
      <LoginBottomSheet isOpen={isOpen} onOpenChange={onOpenChange} />
    </LoginBottomSheetContext>
  );
};
