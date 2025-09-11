import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const ProvideTypes = ['ALL', 'REGULAR_CUSTOMER'] as const;
export type ProvideType = (typeof ProvideTypes)[number];

export const AdminPointShopResponseSchema = z.object({
  id: z.number(),
  storeId: z.number().nullable().optional(),
  storeName: z.string().nullable().optional(),
  name: z.string(),
  point: z.number(),
  provideType: z.enum(ProvideTypes),
  conditions: z.string().nullable().optional(),
  isActive: z.boolean(),
  totalQuantity: z.number().nullable().optional(),
  issuedQuantity: z.number(),
  issueStartOn: z.string().nullable().optional(),
  issueEndOn: z.string().nullable().optional(),
});

export type AdminPointShopResponse = z.infer<typeof AdminPointShopResponseSchema>;

export const AdminCreatePointShopRequestSchema = z.object({
  storeId: z.number(),
  name: z.string(),
  point: z.number().int().nonnegative(),
  provideType: z.enum(ProvideTypes),
  conditions: z.string().optional().nullable(),
  totalQuantity: z.number().int().nullable().optional(),
  issueStartOn: z.string().optional().nullable(),
  issueEndOn: z.string().optional().nullable(),
});

export const AdminUpdatePointShopRequestSchema = z.object({
  name: z.string(),
  point: z.number().int().nonnegative(),
  provideType: z.enum(ProvideTypes),
  conditions: z.string().optional().nullable(),
  totalQuantity: z.number().int().nullable().optional(),
  issueStartOn: z.string().optional().nullable(),
  issueEndOn: z.string().optional().nullable(),
});

export type AdminCreatePointShopRequest = z.infer<typeof AdminCreatePointShopRequestSchema>;
export type AdminUpdatePointShopRequest = z.infer<typeof AdminUpdatePointShopRequestSchema>;

export const GetAdminPointShopListResponse = PageResponse(AdminPointShopResponseSchema);
export const GetAdminPointShopResponse = ApiResponse(AdminPointShopResponseSchema);

