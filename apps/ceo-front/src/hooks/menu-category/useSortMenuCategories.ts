import { menuCategoryApi, SortMenuCategoriesBody } from '@repo/api/ceo';
import { useMutation } from '@tanstack/react-query';

export const useSortMenuCategories = () => {
  return useMutation({
    mutationFn: (body: SortMenuCategoriesBody) => {
      return menuCategoryApi.sortMenuCategories(body);
    },
    onSuccess: () => {
      console.log('메뉴 카테고리 정렬 완료');
    },
    onError: (error: any) => {
      console.error('메뉴 카테고리 정렬 실패:', error);
    },
  });
};