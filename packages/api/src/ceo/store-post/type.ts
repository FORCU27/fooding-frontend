import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export type GetStorePostsParams = {
  searchString: string;
  pageNum: number;
  pageSize: number;
  storeId: number;
  sortType: 'RECENT' | 'OLD';
};

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
  tags: z.array(z.string()).optional().default([]),
  isFixed: z.boolean(),
  isNotice: z.boolean(),
  isCommentAvailable: z.boolean(),
  isActive: z.boolean(),
  likeCount: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  createdAt: z.string(),
  images: z.array(StorePostImage).optional(),
});

export type StorePost = z.infer<typeof StorePost>;

export const GetStorePostsResponse = PageResponse(StorePost);
export type GetStorePostsResponse = z.infer<typeof GetStorePostsResponse>;

export const GetStorePostResponse = ApiResponse(StorePost);
export type GetStorePostResponse = z.infer<typeof GetStorePostResponse>;
