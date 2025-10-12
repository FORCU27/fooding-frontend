import { ceoPostApi } from '@repo/api/ceo';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = ['ceo', 'posts', 'recent'];

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await ceoPostApi.list({
        pageNum: 1,
        pageSize: 5,
      });

      return response.data;
    },
  });
};
