import { z } from 'zod/v4';

import { ApiResponse, PageInfo } from '../../shared';

export const StorePostImage = z.object({
  imageId: z.string(),
  imageUrl: z.string(),
});

export type StorePost = z.infer<typeof StorePost>;
export const StorePost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  images: z.array(StorePostImage).optional(),
  isFixed: z.boolean(),
  isNotice: z.boolean(),
  isCommentAvailable: z.boolean(),
  likeCount: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  isLiked: z.boolean(),
  createdAt: z.iso.datetime({ local: true }),
});

export type GetStorePostListParams = {
  storeId: number;
};

export type GetStorePostListResponse = z.infer<typeof GetStorePostListResponse>;
export const GetStorePostListResponse = z.object({
  status: z.string(),
  data: z.object({
    list: z.array(StorePost),
    pageInfo: PageInfo,
  }),
});

export type GetStorePostByIdResponse = z.infer<typeof GetStorePostByIdResponse>;
export const GetStorePostByIdResponse = ApiResponse(StorePost);
