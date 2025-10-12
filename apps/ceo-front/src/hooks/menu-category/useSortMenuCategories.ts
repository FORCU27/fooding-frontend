import { menuCategoryApi, SortMenuCategoriesBody } from '@repo/api/ceo';
import { useMutation } from '@tanstack/react-query';

export const useSortMenuCategories = () => {
  return useMutation({
    mutationFn: (body: SortMenuCategoriesBody) => {
      return menuCategoryApi.sortMenuCategories(body);
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
