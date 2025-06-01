// apps/app-front/src/providers/StoreProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getSelectedStoreId } from '@/services/locale';

type StoreContextType = {
  storeId: string | null;
  isLoading: boolean;
};

const StoreContext = createContext<StoreContextType>({
  storeId: null,
  isLoading: true,
});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoreId = async () => {
      try {
        const id = await getSelectedStoreId();
        setStoreId(id || null);
      } catch (error) {
        console.error('Failed to load store ID:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoreId();
  }, []);

  return <StoreContext.Provider value={{ storeId, isLoading }}>{children}</StoreContext.Provider>;
}
