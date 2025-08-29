import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const AdminLeadResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  source: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type AdminLeadResponse = z.infer<typeof AdminLeadResponseSchema>;

export type GetLeadListParams = {
  page: number;
  size: number;
  searchString?: string;
};

export const GetLeadListResponse = PageResponse(AdminLeadResponseSchema);

