import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export type AdminLeadResponse = z.infer<typeof AdminLeadResponseSchema>;
export const AdminLeadResponseSchema = ApiResponse(
  z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    source: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    isUploaded: z.boolean().nullable().optional(),
  }),
);

export type GetLeadListParams = {
  page: number;
  size: number;
  searchString?: string;
  isUploaded?: boolean;
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
