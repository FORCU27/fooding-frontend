import z from 'zod/v4';

import { PageResponse } from '../../shared';

export type GetBookmarkStoreListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
};

export type Bookmark = z.infer<typeof Bookmark>;
export const Bookmark = z.object({
  averageRating: z.number(),
  bookmarkCount: z.number(),
  city: z.string(),
  estimatedWaitingTimeMinutes: z.number().nullable(),
  id: z.number(),
  images: z.string().array(),
  isFinished: z.boolean(),
  name: z.string(),
  reviewCount: z.number(),
  storeId: z.number(),
  visitCount: z.number(),
});

export type GetBookmarkStoreListResponse = z.infer<typeof GetBookmarkStoreListResponse>;
export const GetBookmarkStoreListResponse = PageResponse(Bookmark);

export type CreateBookmarkResponse = z.infer<typeof CreateBookmarkResponse>;
export const CreateBookmarkResponse = z.object({
  status: z.string(),
  data: z.number(),
});

export type DeleteBookmarkResponse = z.infer<typeof DeleteBookmarkResponse>;
export const DeleteBookmarkResponse = z.object({
  status: z.string(),
  data: z.null(),
});
