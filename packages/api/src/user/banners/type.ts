import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const UserBannerResponseSchema = z.object({
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
  parameters: z.record(z.string(), z.unknown()).nullable().optional(),
});
export type UserBannerResponse = z.infer<typeof UserBannerResponseSchema>;

export const GetUserBannerListResponse = PageResponse(UserBannerResponseSchema);
export type GetUserBannerListResponse = z.infer<typeof GetUserBannerListResponse>;

export const GetUserBannerResponse = ApiResponse(UserBannerResponseSchema);
export type GetUserBannerResponse = z.infer<typeof GetUserBannerResponse>;

export type UserBannerListParams = {
  pageNum?: number;
  pageSize?: number;
  searchString?: string;
};
