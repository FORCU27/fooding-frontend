import { menuCategoryApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMenuCategory = (storeId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) => {
      return menuCategoryApi.deleteMenuCategory(categoryId);
    },
    onSuccess: () => {
      // 카테고리 목록 재조회
      if (storeId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.ceo.menuCategory.list, storeId],
        });
      }
      console.log('메뉴 카테고리 삭제 완료');
    },
    onError: (error: unknown) => {
      console.error('메뉴 카테고리 삭제 실패:', error);
    },
  });
};