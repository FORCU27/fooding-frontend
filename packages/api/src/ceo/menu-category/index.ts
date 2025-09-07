import {
  GetMenuCategoriesResponse,
  CreateMenuCategoryResponse,
  SortMenuCategoriesBody,
  SortMenuCategoriesResponse,
  UpdateMenuCategoryResponse,
  DeleteMenuCategoryResponse,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/stores';

export const menuCategoryApi = {
  // 메뉴 카테고리 목록 조회
  getMenuCategories: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/menu-categorys`);
    return GetMenuCategoriesResponse.parse(response);
  },

  // 메뉴 카테고리 생성
  createMenuCategory: async (storeId: number, categoryName: string) => {
    const response = await api.post(
      `${ENDPOINT}/${storeId}/menu-categorys`,
      null, // body가 없고 query parameter로 전송
      {
        params: { categoryName },
      }
    );
    return CreateMenuCategoryResponse.parse(response);
  },

  // 메뉴 카테고리 정렬
  sortMenuCategories: async (body: SortMenuCategoriesBody) => {
    const response = await api.post(
      `${ENDPOINT}/menu-categorys/sort`,
      body
    );
    return SortMenuCategoriesResponse.parse(response);
  },

  // 메뉴 카테고리 수정
  updateMenuCategory: async (categoryId: number, categoryName: string) => {
    const response = await api.patch(
      `${ENDPOINT}/menu-categorys/${categoryId}`,
      null,
      {
        params: { categoryName },
      }
    );
    return UpdateMenuCategoryResponse.parse(response);
  },

  // 메뉴 카테고리 삭제
  deleteMenuCategory: async (categoryId: number) => {
    const response = await api.delete(
      `${ENDPOINT}/menu-categorys/${categoryId}`
    );
    return DeleteMenuCategoryResponse.parse(response);
  },
};