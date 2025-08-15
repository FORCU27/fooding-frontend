import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi, PutStoreBody } from '@repo/api/ceo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: PutStoreBody }) => {
      return storeApi.putStore({ id, body });
    },
    onSuccess: (_, variables) => {
      console.log('PUT success, invalidating query for store:', variables.id);
      // 성공 시 해당 store 데이터 무효화하여 재조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.store.getStore, variables.id],
      });
      
      // 잠시 대기 후 재조회 (서버 인덱싱 시간 고려)
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: [queryKeys.ceo.store.getStore, variables.id],
        });
      }, 1000);
    },
  });
};
