import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const Banner = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  priority: z.number(),
  link: z.string().nullable().optional(),
  linkType: z.string(),
  imageUrl: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  placement: z.string().nullable().optional(),
  parameters: z
    .object({
      screenId: z.string().optional(),
    })
    .optional(),
});
export type UserBannerResponse = z.infer<typeof Banner>;

export const GetBannerListResponse = PageResponse(Banner);
export type GetBannerListResponse = z.infer<typeof GetBannerListResponse>;

export const GetBannerByIdResponse = ApiResponse(Banner);
export type GetBannerByIdResponse = z.infer<typeof GetBannerByIdResponse>;

export type GetBannerListParams = {
  pageNum: number;
  pageSize: number;
  searchString: string;
};
