import { authApi } from '@repo/api/auth';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetUserNicknameCheck = (nickname: string) => {
  return useQuery({
    queryKey: [queryKeys.me.nicknameCheck, nickname],
    queryFn: async () => {
      const response = await authApi.nicknameCheck(nickname);
      return response.data;
    },
    enabled: !!nickname,
  });
};
