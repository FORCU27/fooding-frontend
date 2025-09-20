import { authApi } from '@repo/api/auth';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

const selfQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await authApi.getSelf();
      return response.data;
    },
  });

export const useGetSelf = () => {
  return useSuspenseQuery(selfQueryOptions());
};

export const useGetSelfQuery = () => {
  return useQuery(selfQueryOptions());
};
