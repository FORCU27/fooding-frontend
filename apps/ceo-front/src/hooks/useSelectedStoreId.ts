import { useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@repo/api/configs/storage-keys';
import Cookies from 'js-cookie';

/**
 * 선택된 가게 ID를 관리하는 Hook
 * - 쿠키에서 selectedStoreId를 읽어옴
 * - 가게 변경 시 쿠키 업데이트 (API 호출)
 */
export const useSelectedStoreId = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 로드 시 쿠키에서 값 읽기
  useEffect(() => {
    const loadStoreId = async () => {
      try {
        // 먼저 일반 쿠키로 시도
        const clientCookie = Cookies.get(STORAGE_KEYS.SELECTED_STORE_ID);

        if (clientCookie) {
          setSelectedStoreId(Number(clientCookie));
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        // httpOnly 쿠키인 경우 API를 통해 가져오기
        const response = await fetch('/api/store/selected', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.storeId) {
            setSelectedStoreId(Number(data.storeId));
          } else {
            setSelectedStoreId(null);
          }
        } else {
          setSelectedStoreId(null);
        }
      } catch (error) {
        console.error('Failed to load store ID:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadStoreId();
  }, []);

  /**
   * 가게 선택 (쿠키 업데이트)
   * httpOnly 쿠키 설정을 위해 API Route 호출
   */
  const selectStore = async (storeId: number) => {
    try {
      const response = await fetch('/api/store/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to select store');
      }

      setSelectedStoreId(storeId);

      // 페이지 새로고침하여 middleware가 다시 체크하도록
      window.location.href = '/';
    } catch (error) {
      console.error('Store selection failed:', error);
      throw error;
    }
  };

  /**
   * 가게 선택 해제
   */
  const clearSelectedStore = () => {
    Cookies.remove(STORAGE_KEYS.SELECTED_STORE_ID);
    setSelectedStoreId(null);
  };

  return {
    selectedStoreId,
    isLoading,
    isInitialized,
    selectStore,
    clearSelectedStore,
  };
};

/**
 * Server Component에서 사용할 수 있는 유틸리티 함수
 * cookies() 함수를 사용하여 서버에서 직접 읽기
 */
export const getSelectedStoreIdServer = async () => {
  // Server Component에서 사용
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const storeIdCookie = cookieStore.get(STORAGE_KEYS.SELECTED_STORE_ID);

  return storeIdCookie ? Number(storeIdCookie.value) : null;
};
