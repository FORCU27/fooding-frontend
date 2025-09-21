'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import Cookies from 'js-cookie';

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeId, setStoreId] = useState<string>('26');

  useEffect(() => {
    const id = Cookies.get(STORAGE_KEYS.SELECTED_STORE_ID);
    if (id) setStoreId(id);
  }, []);

  return <StoreContext.Provider value={{ storeId, setStoreId }}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
