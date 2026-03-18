import { menuApi, type SortMenusBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSortMenus = (storeId: number | null, categoryId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SortMenusBody) => menuApi.sortMenus(body),
    onSuccess: () => {
      // 메뉴 목록 캐시 무효화
      if (storeId && categoryId) {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.ceo.menu.list,
            {
              storeId,
              categoryId,
              pageNum: 1,
              pageSize: 100,
            },
          ],
        });
      }
    },
  });
};
