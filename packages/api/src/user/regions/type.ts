import { z } from 'zod/v4';

import { ApiResponse, PageInfo } from '../../shared';

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
  level?: number;
  parentRegionId?: string | null;
};

export type GetRegionListResponse = z.infer<typeof GetRegionListResponse>;
export const GetRegionListResponse = ApiResponse(
  z.object({
    list: z.tuple([Region], Region),
    pageInfo: PageInfo,
  }),
);
