import { usersApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useSearchUsers = (keyword: string, pageNum = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [queryKeys.ceo.user.search, keyword, pageNum, pageSize],
    queryFn: () => {
      return usersApi.getUsers({
        searchString: keyword,
        pageNum,
        pageSize,
      });
    },
    enabled: keyword.length >= 2, // 2글자 이상일 때만 검색
    staleTime: 1000 * 60, // 1분간 캐시
  });
};
