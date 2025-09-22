import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

// 메뉴 카테고리 스키마
export const MenuCategory = z.object({
  id: z.number(),
  name: z.string(),
  sortOrder: z.number(),
});

export type MenuCategory = z.infer<typeof MenuCategory>;

// GET 응답 타입 - 카테고리 목록
export const GetMenuCategoriesResponse = ApiResponse(z.array(MenuCategory));

export type GetMenuCategoriesResponse = z.infer<typeof GetMenuCategoriesResponse>;

// POST 응답 타입 - 생성된 카테고리 ID
export const CreateMenuCategoryResponse = ApiResponse(z.number());

export type CreateMenuCategoryResponse = z.infer<typeof CreateMenuCategoryResponse>;

// POST 카테고리 정렬 요청 바디
export const SortMenuCategoriesBody = z.object({
  menuCategoryIds: z.array(z.number()),
});

export type SortMenuCategoriesBody = z.infer<typeof SortMenuCategoriesBody>;

// POST 카테고리 정렬 응답
export const SortMenuCategoriesResponse = ApiResponse(z.null());

export type SortMenuCategoriesResponse = z.infer<typeof SortMenuCategoriesResponse>;

// PATCH 카테고리 수정 응답
export const UpdateMenuCategoryResponse = ApiResponse(z.number());

export type UpdateMenuCategoryResponse = z.infer<typeof UpdateMenuCategoryResponse>;

// DELETE 카테고리 삭제 응답
export const DeleteMenuCategoryResponse = ApiResponse(z.null());

export type DeleteMenuCategoryResponse = z.infer<typeof DeleteMenuCategoryResponse>;