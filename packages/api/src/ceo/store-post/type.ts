import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type CreateStorePostParams = {
  storeId: number;
  title: string;
  content: string;
  tags?: string[];
  isFixed: boolean;
  isNotice: boolean;
  isCommentAvailable: boolean;
  imageIds?: string[];
};

export type PutStorePostParams = {
  title: string;
  content: string;
  tags?: string[];
  isFixed: boolean;
  isNotice: boolean;
  isCommentAvailable: boolean;
  deleteImageIds?: string[];
  imageIds?: string[];
};

const StorePostImage = z.object({
  imageId: z.string(),
  imageUrl: z.string(),
});

export const StorePost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).nullable(),
  isFixed: z.boolean(),
  isNotice: z.boolean(),
  isCommentAvailable: z.boolean(),
  isActive: z.boolean(),
  likeCount: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  createdAt: z.string(),
  images: StorePostImage.nullable(),
});

export const GetStorePostsResponse = ApiResponse(z.array(StorePost));
export type GetStorePostsResponse = z.infer<typeof GetStorePostsResponse>;

export const GetStorePostResponse = ApiResponse(StorePost);
export type GetStorePostResponse = z.infer<typeof GetStorePostResponse>;
