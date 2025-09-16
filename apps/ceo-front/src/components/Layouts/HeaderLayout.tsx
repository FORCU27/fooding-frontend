'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { Store } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { SelectBox } from '@repo/design-system/components/ceo';
import { CeoBellIcon } from '@repo/design-system/icons';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

interface Props {
  className?: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const HeaderLayout = ({ className, isSidebarOpen, onToggleSidebar }: Props) => {
  const qc = useQueryClient();

  const { data: me } = useQuery({
    // TODO 쿼리 키 config에 저장해서 활용
    queryKey: [queryKeys.ceo.me],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (!res.ok) {
        console.warn('me fetch failed:', res.status, await res.text());
        return null;
      }
      return res.json();
    },
  });

  const { data: selectedStore, isFetching: fetchingStore } = useQuery({
    queryKey: [queryKeys.ceo.store.selectedStore],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });
      if (!res.ok) {
        console.warn('selectedStore fetch failed:', res.status, await res.text());
        return null;
      }
      return res.json();
    },
  });

  const { data: stores, isLoading: loadingStores } = useQuery({
    queryKey: [queryKeys.ceo.store.storeList],
    queryFn: async () => {
      const res = await fetch('/api/store/list', { cache: 'no-store' });
      if (!res.ok) {
        console.warn('storeList fetch failed:', res.status, await res.text());
        return null;
      }
      return res.json();
    },
  });

  const storeOptions = useMemo(() => {
    if (!stores?.data) return [];
    return stores.data.map((store: Store) => ({ value: String(store.id), label: store.name }));
  }, [stores]);

  // 현재 value = 선택된 매장 id
  const currentStoreValue = selectedStore?.data?.id ? String(selectedStore.data.id) : undefined;

  // 선택 변경 mutation
  const { mutateAsync: changeStore, isPending: changingStore } = useMutation({
    mutationFn: async (storeIdStr: string) => {
      const storeId = Number(storeIdStr);
      const r = await fetch('/api/store/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId }),
      });
      if (!r.ok) throw new Error('store change failed');
      return r.json();
    },
    onSuccess: async () => {
      // 선택된 매장 정보 갱신
      await qc.invalidateQueries({ queryKey: [queryKeys.ceo.store.selectedStore] });
    },
  });

  const handleValueChange = async (value: string) => {
    await changeStore(value);
  };

  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청 보내기
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div
      className={`flex px-[32px] py-[17px] justify-between bg-white items-center z-50 relative ${className || ''}`}
    >
      <div className='flex items-center gap-3'>
        {/* 모바일과 태블릿에서만 햄버거 메뉴 표시 */}
        <button
          onClick={onToggleSidebar}
          className='p-2 hover:bg-gray-100 rounded-md transition-colors lg:hidden'
          aria-label='메뉴 토글'
        >
          {isSidebarOpen ? (
            // X 아이콘 (사이드바가 열려있을 때)
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-700'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          ) : (
            // 햄버거 아이콘 (사이드바가 닫혀있을 때)
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-gray-700'
            >
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          )}
        </button>

        <Image
          src='/images/fooding-ceo-logo.svg'
          width={162}
          height={28}
          alt='ceo-logo'
          className='object-contain'
        />
      </div>
      <div className='flex gap-[18px] items-center'>
        <SelectBox
          placeholder={selectedStore?.data.name}
          value={currentStoreValue}
          options={storeOptions}
          onValueChange={handleValueChange}
          disabled={loadingStores || fetchingStore || changingStore}
          className='h-[40px] text-[14px] py-[10px] px-[12px] w-auto'
        />
        <span className='text-[14px] font-semibold'>{me?.data.name} 사장님</span>
        <button
          type='button'
          onClick={handleLogoutClick}
          className={`cursor-pointer text-[14px] font-semibold text-gray-5 transition-all`}
        >
          로그아웃
        </button>
        <CeoBellIcon size={24} />
      </div>
    </div>
  );
};

export default HeaderLayout;
