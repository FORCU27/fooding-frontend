import { Store } from '@repo/api/ceo';
import { SelectBox } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { useChangeSelectedStore } from '@/hooks/store/useChangeSelectedStore';

export const StoreSelector = () => {
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

    changeStore.mutate({
      storeId: Number(value),
    });
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
