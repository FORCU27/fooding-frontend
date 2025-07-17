import { authApi } from '@repo/api/auth';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetUserInfo = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.me.user],
    queryFn: async () => {
      const response = await authApi.getSelf();
      return response.data;
    },
  });
};
