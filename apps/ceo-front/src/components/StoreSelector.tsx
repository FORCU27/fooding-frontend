import { Store } from '@repo/api/ceo';
import { SelectBox } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '@/context/StoreContext';
import { useChangeSelectedStore } from '@/hooks/store/useChangeSelectedStore';

export const StoreSelector = () => {
  const { setStoreId } = useStore();
  const changeStore = useChangeSelectedStore();

  const selectedStoreQuery = useQuery({
    queryKey: ['selectedStore'],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('selectedStore fetch failed');
      }

      return (await res.json()) as { data: Store };
    },
  });

  const storeListQuery = useQuery({
    queryKey: ['storeList'],
    queryFn: async () => {
      const res = await fetch('/api/store/list', { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('storeList fetch failed');
      }

      return (await res.json()) as { data: Store[] };
    },
  });

  if (selectedStoreQuery.isPending || storeListQuery.isPending) {
    return null;
  }

  if (selectedStoreQuery.isError || storeListQuery.isError) {
    return null;
  }

  const stores = storeListQuery.data;
  const selectedStore = selectedStoreQuery.data;

  const currentStoreValue = String(selectedStore.data.id);

  const storeSelectOptions = stores.data.map((store) => ({
    value: String(store.id),
    label: store.name,
  }));

  const onStoreValueChange = (value: string) => {
    if (changeStore.isPending) return;

    changeStore.mutate(
      {
        storeId: Number(value),
      },
      {
        onSuccess: () => {
          // 서버 변경 완료 후 로컬 상태/스토리지/쿠키 모두 업데이트
          setStoreId(value);
        },
      },
    );
  };

  return (
    <SelectBox
      className='w-fit'
      size='small'
      value={currentStoreValue}
      options={storeSelectOptions}
      onValueChange={onStoreValueChange}
      disabled={changeStore.isPending}
    />
  );
};
