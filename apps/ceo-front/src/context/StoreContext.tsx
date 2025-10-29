'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import Cookies from 'js-cookie';

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
  clearStore: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeIdState, setStoreIdState] = useState<string>('');

  useEffect(() => {
    // 초기 로드 시: 쿠키 → localStorage 순서로 storeId 불러오기
    const cookieId = Cookies.get(STORAGE_KEYS.SELECTED_STORE_ID);
    const localId = localStorage.getItem(STORAGE_KEYS.SELECTED_STORE_ID);
    const initialId = cookieId || localId;

    if (initialId) setStoreIdState(initialId);
  }, []);

  /**
   * 매장 변경 시
   * - storeId 상태/로컬스토리지/쿠키 업데이트
   * - 페이지 새로고침
   */
  const setStoreId = (id: string) => {
    if (!id) {
      throw new Error('선택된 가게가 없습니다.');
    }

    setStoreIdState(id);
    localStorage.setItem(STORAGE_KEYS.SELECTED_STORE_ID, id);
    Cookies.set(STORAGE_KEYS.SELECTED_STORE_ID, id, { path: '/', sameSite: 'lax' });

    // 매장 변경 시 새로고침
    window.location.reload();
  };

  /**
   * 로그아웃 시
   * - storeId 상태 초기화
   * - 로컬스토리지/쿠키 제거
   */
  const clearStore = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_STORE_ID);
      Cookies.remove(STORAGE_KEYS.SELECTED_STORE_ID, { path: '/' });
      setStoreIdState('');
    }
  };
  return (
    <StoreContext.Provider value={{ storeId: storeIdState, setStoreId, clearStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
