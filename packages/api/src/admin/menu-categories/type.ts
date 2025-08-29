import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const AdminMenuCategoryResponseSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  sortOrder: z.number(),
});

export type AdminMenuCategoryResponse = z.infer<typeof AdminMenuCategoryResponseSchema>;

export const AdminMenuCategoryCreateRequestSchema = z.object({
  storeId: z.number(),
  name: z.string(),
  description: z.string(),
  sortOrder: z.number(),
});

export const AdminMenuCategoryUpdateRequestSchema = z.object({
  storeId: z.number(),
  name: z.string(),
  description: z.string(),
  sortOrder: z.number(),
});

export type AdminMenuCategoryCreateRequest = z.infer<typeof AdminMenuCategoryCreateRequestSchema>;
export type AdminMenuCategoryUpdateRequest = z.infer<typeof AdminMenuCategoryUpdateRequestSchema>;

export const GetMenuCategoryListResponse = PageResponse(AdminMenuCategoryResponseSchema);
export const GetMenuCategoryResponse = ApiResponse(AdminMenuCategoryResponseSchema);

