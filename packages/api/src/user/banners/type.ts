import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export type BannerLinkType = (typeof BANNER_LINK_TYPES)[number];
export const BANNER_LINK_TYPES = [
  'INTERNAL',
  'EXTERNAL',
  'MODAL',
  'DOWNLOAD',
  'NONE',
  'DEEPLINK',
  'APP_STORE',
  'PHONE',
  'EMAIL',
  'SMS',
] as const;

export type GetBannerListParams = {
  searchString: string;
  pageNum: number;
  pageSize: number;
};

export const Banner = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  priority: z.number(),
  link: z.string().nullable(),
  linkType: z.enum(BANNER_LINK_TYPES),
});

export const GetBannerListResponse = PageResponse(Banner);
