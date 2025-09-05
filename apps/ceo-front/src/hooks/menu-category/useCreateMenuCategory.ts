import { menuCategoryApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, categoryName }: { storeId: number; categoryName: string }) => {
      return menuCategoryApi.createMenuCategory(storeId, categoryName);
    },
    onSuccess: (data, variables) => {
      // 카테고리 목록 재조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menuCategory.list, variables.storeId],
      });
      console.log('메뉴 카테고리 생성 완료, ID:', data.data);
    },
    onError: (error: any) => {
      console.error('메뉴 카테고리 생성 실패:', error);
    },
  });
};