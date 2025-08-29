import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const AdminLeadResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  source: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
});

export type AdminLeadResponse = z.infer<typeof AdminLeadResponseSchema>;

export type GetLeadListParams = {
  page: number;
  size: number;
  searchString?: string;
};

export const GetLeadListResponse = PageResponse(AdminLeadResponseSchema);

export const UploadLeadRequestSchema = z.object({
  ownerId: z.number(),
  regionId: z.string(),
});

export type UploadLeadRequest = z.infer<typeof UploadLeadRequestSchema>;

export const UploadLeadResponseSchema = z.object({
  status: z.string().nullable(),
  data: z.number(), // Store ID
});

export type UploadLeadResponse = z.infer<typeof UploadLeadResponseSchema>;

