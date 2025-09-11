import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const AdminRegionResponseSchema = z.object({
  id: z.string(),
  parentRegionId: z.string().nullable(),
  name: z.string(),
  timezone: z.string(),
  countryCode: z.string(),
  legalCode: z.string(),
  currency: z.string(),
  level: z.number(),
});

export type AdminRegionResponse = z.infer<typeof AdminRegionResponseSchema>;

export const AdminRegionCreateRequestSchema = z.object({
  id: z.string(),
  parentRegionId: z.string().nullable().optional(),
  name: z.string(),
  timezone: z.string(),
  countryCode: z.string(),
  legalCode: z.string(),
  currency: z.string(),
  level: z.number(),
});

export const AdminRegionUpdateRequestSchema = z.object({
  parentRegionId: z.string().nullable().optional(),
  name: z.string(),
  timezone: z.string(),
  countryCode: z.string(),
  legalCode: z.string(),
  currency: z.string(),
  level: z.number(),
});

export type AdminRegionCreateRequest = z.infer<typeof AdminRegionCreateRequestSchema>;
export type AdminRegionUpdateRequest = z.infer<typeof AdminRegionUpdateRequestSchema>;

export const GetRegionListResponse = PageResponse(AdminRegionResponseSchema);
export const GetRegionResponse = ApiResponse(AdminRegionResponseSchema);

