import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const CeoPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  type: z.enum(['NOTICE', 'EVENT']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CeoPost = z.infer<typeof CeoPostSchema>;

export const GetCeoPostListResponseSchema = PageResponse(CeoPostSchema);
export type GetCeoPostListResponse = z.infer<typeof GetCeoPostListResponseSchema>;

export type GetCeoPostListData = GetCeoPostListResponse['data'];

export type GetCeoPostListParams = {
  searchString?: string;
  type?: CeoPost['type'];
  pageNum?: number;
  pageSize?: number;
};
