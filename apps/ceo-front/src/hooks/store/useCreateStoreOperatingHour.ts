import { storeApi, StoreOperatingHourBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateStoreOperatingHourParams = {
  id: number;
  body: StoreOperatingHourBody;
};

export const useCreateStoreOperatingHour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: CreateStoreOperatingHourParams) =>
      storeApi.createStoreOperatingHour(id, body),

    mutationKey: [queryKeys.ceo.store.operatingHour, 'create'],

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.store.operatingHour, variables.id],
      });
    },
  });
};
