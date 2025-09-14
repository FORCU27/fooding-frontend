import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export type LinkType = (typeof LINK_TYPES)[number];
export const LINK_TYPES = [
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

export const GetBannerListResponse = PageResponse(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    active: z.boolean(),
    priority: z.number(),
    link: z.string(),
    linkType: z.enum(LINK_TYPES),
  }),
);
