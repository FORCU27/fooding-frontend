import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const AdminMenuResponseSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageUrl: z.string(),
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
});

export type AdminMenuResponse = z.infer<typeof AdminMenuResponseSchema>;

export const AdminMenuCreateRequestSchema = z.object({
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageId: z.string(),
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
});

export const AdminMenuUpdateRequestSchema = z.object({
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageId: z.string().optional(),
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
});

export type AdminMenuCreateRequest = z.infer<typeof AdminMenuCreateRequestSchema>;
export type AdminMenuUpdateRequest = z.infer<typeof AdminMenuUpdateRequestSchema>;

export const GetMenuListResponse = PageResponse(AdminMenuResponseSchema);

