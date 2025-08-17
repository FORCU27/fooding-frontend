import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export type Region = z.infer<typeof Region>;
export const Region = z.object({
  id: z.string(),
  parentRegionId: z.string().nullable(),
  name: z.string(),
  timezone: z.string(),
  countryCode: z.string(),
  legalCode: z.string(),
  currency: z.string(),
  level: z.number(),
});

export type GetRegionListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
};

export type GetRegionListResponse = z.infer<typeof GetRegionListResponse>;
export const GetRegionListResponse = PageResponse(Region);
