import { menuCategoryApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateMenuCategory = (storeId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, categoryName }: { categoryId: number; categoryName: string }) => {
      return menuCategoryApi.updateMenuCategory(categoryId, categoryName);
    },
    onSuccess: () => {
      // 카테고리 목록 재조회
      if (storeId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.ceo.menuCategory.list, storeId],
        });
      }
      console.log('메뉴 카테고리 수정 완료');
    },
    onError: (error: any) => {
      console.error('메뉴 카테고리 수정 실패:', error);
    },
  });
};