import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const AdminStoreImageResponseSchema = z.object({
  id: z.number(),
  storeId: z.number().optional(),
  imageUrl: z.string(),
  sortOrder: z.number(),
  tags: z.array(z.string()).optional().default([]),
  isMain: z.boolean().optional(),
});

export type AdminStoreImageResponse = z.infer<typeof AdminStoreImageResponseSchema>;

// Flat update payload (uses imageUrl)
export const AdminStoreImageUpdateRequestSchema = z.object({
  imageUrl: z.string().optional(),
  sortOrder: z.number(),
  tags: z.array(z.string()).optional().default([]),
});

export type AdminStoreImageUpdateRequest = z.infer<typeof AdminStoreImageUpdateRequestSchema>;

export const GetAdminStoreImageListResponse = PageResponse(AdminStoreImageResponseSchema);
export const GetAdminStoreImageResponse = ApiResponse(AdminStoreImageResponseSchema);

// Flat create payload (storeId + imageUrl)
export const AdminStoreImageCreateRequestSchema = z.object({
  storeId: z.number(),
  imageUrl: z.string(),
  sortOrder: z.number(),
  tags: z.array(z.string()).optional().default([]),
});

export type AdminStoreImageCreateRequest = z.infer<typeof AdminStoreImageCreateRequestSchema>;

// Nested create payload (uses imageId, storeId from path)
export const AdminStoreImageCreateNestedRequestSchema = z.object({
  imageId: z.string(),
  sortOrder: z.number(),
  tags: z.array(z.string()).optional().default([]),
});

export type AdminStoreImageCreateNestedRequest = z.infer<typeof AdminStoreImageCreateNestedRequestSchema>;

// Update main flag payload
export const AdminStoreImageMainRequestSchema = z.object({
  isMain: z.boolean(),
});

export type AdminStoreImageMainRequest = z.infer<typeof AdminStoreImageMainRequestSchema>;
