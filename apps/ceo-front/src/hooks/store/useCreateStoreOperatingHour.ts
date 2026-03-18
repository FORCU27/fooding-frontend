import { storeApi, StoreOperatingHourBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateStoreOperatingHourParams = {
  storeId: number;
  body: StoreOperatingHourBody;
};

export const useCreateStoreOperatingHour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, body }: CreateStoreOperatingHourParams) =>
      storeApi.createStoreOperatingHour(storeId, body),

    mutationKey: [queryKeys.ceo.store.operatingHour, 'create'],

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.store.operatingHour, variables.storeId],
      });
    },
  });
};
