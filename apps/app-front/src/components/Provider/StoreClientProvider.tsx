// apps/app-front/src/components/Provider/StoreClientProvider.tsx
'use client';

import { createContext, useContext } from 'react';

type StoreContextType = {
  storeId: number;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore는 StoreContext 안에서만 사용할 수 있습니다.');
  }

  return context;
};

export function StoreClientProvider({
  children,
  initialStoreId,
}: {
  children: React.ReactNode;
  initialStoreId: number;
}) {
  return <StoreContext value={{ storeId: initialStoreId }}>{children}</StoreContext>;
}
