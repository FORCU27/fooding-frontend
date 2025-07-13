import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type StorePost = z.infer<typeof StorePost>;
export const StorePost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  images: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    }),
  ),
  createdAt: z.iso.datetime({ local: true }),
  fixed: z.boolean(),
});

export type GetStorePostListParams = {
  storeId: number;
};

export type GetStorePostListResponse = z.infer<typeof GetStorePostListResponse>;
export const GetStorePostListResponse = ApiResponse(z.array(StorePost));

export type GetStorePostByIdResponse = z.infer<typeof GetStorePostByIdResponse>;
export const GetStorePostByIdResponse = ApiResponse(StorePost);
