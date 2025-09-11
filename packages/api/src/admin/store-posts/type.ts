import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const AdminStorePostResponseSchema = z.object({
  id: z.number(),
  // 백엔드 응답에 storeId가 누락될 수 있어 optional 처리
  storeId: z.number().optional().nullable(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).nullable().optional().transform((v) => v ?? []),
  isFixed: z.boolean(),
});

export type AdminStorePostResponse = z.infer<typeof AdminStorePostResponseSchema>;

export const AdminStorePostCreateRequestSchema = z.object({
  storeId: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional().default([]),
  isFixed: z.boolean().default(false),
});

export const AdminStorePostUpdateRequestSchema = z.object({
  storeId: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional().default([]),
  isFixed: z.boolean().default(false),
});

export type AdminStorePostCreateRequest = z.infer<typeof AdminStorePostCreateRequestSchema>;
export type AdminStorePostUpdateRequest = z.infer<typeof AdminStorePostUpdateRequestSchema>;

export const GetAdminStorePostListResponse = PageResponse(AdminStorePostResponseSchema);
export const GetAdminStorePostResponse = ApiResponse(AdminStorePostResponseSchema);

