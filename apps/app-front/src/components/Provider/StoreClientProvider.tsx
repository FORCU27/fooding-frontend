// apps/app-front/src/components/Provider/StoreClientProvider.tsx
'use client';

import { createContext, useContext } from 'react';

type StoreContextType = {
  storeId: string | null;
};

const StoreContext = createContext<StoreContextType>({
  storeId: null,
});

export const useStore = () => useContext(StoreContext);

export function StoreClientProvider({
  children,
  initialStoreId,
}: {
  children: React.ReactNode;
  initialStoreId: string | null;
}) {
  return (
    <StoreContext.Provider value={{ storeId: initialStoreId }}>{children}</StoreContext.Provider>
  );
}
