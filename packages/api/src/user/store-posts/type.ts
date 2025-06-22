import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

const StorePost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  createdAt: z.iso.datetime({ local: true }),
  fixed: z.boolean(),
});

export type GetStorePostListParams = {
  storeId: number;
};

export type GetStorePostListResponse = z.infer<typeof GetStorePostListResponse>;
export const GetStorePostListResponse = ApiResponse(z.array(StorePost));

export const GetStorePostByIdResponse = ApiResponse(StorePost);
