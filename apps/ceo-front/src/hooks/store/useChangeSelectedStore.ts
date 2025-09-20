import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeSelectedStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storeId }: { storeId: number }) => {
      const r = await fetch('/api/store/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId }),
      });
      if (!r.ok) throw new Error('store change failed');
      return r.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['selectedStore'] });
    },
  });
};
