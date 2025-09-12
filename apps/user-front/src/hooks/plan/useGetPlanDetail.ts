import { queryKeys } from '@repo/api/configs/query-keys';
import { planApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPlanDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.plan.detail, id],
    queryFn: async () => {
      const response = await planApi.getPlanById(id);
      return response.data;
    },
  });
};
