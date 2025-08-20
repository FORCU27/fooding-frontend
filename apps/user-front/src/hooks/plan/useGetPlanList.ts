import { queryKeys } from '@repo/api/configs/query-keys';
import { GetPlanListParams, planApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPlanList = (params?: GetPlanListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.plan.list, params],
    queryFn: async () => {
      const response = await planApi.getPlanList(params);
      return response.data;
    },
  });
};
