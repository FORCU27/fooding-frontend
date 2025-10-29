import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const BOOKMARK_SORT_TYPES = ['RECENT', 'OLD'] as const;
export type BookmarkSortType = (typeof BOOKMARK_SORT_TYPES)[number];

export type GetStoreBookmarkParams = {
  searchString: string;
  pageNum: number;
  pageSize: number;
  sortType: BookmarkSortType;
};

export const StoreBookmark = z.object({
  id: z.number(),
  userId: z.number(),
  profileImage: z.string().nullable(),
  nickname: z.string(),
  verifiedCount: z.number(),
  address: z.string().nullable(),
  addressDetail: z.string().nullable(),
  isStarred: z.boolean().nullable(),
  createdAt: z.string(),
});
export type StoreBookmark = z.infer<typeof StoreBookmark>;

export const GetStoreBookmarkResponse = PageResponse(StoreBookmark);
export type GetStoreBookmarkResponse = z.infer<typeof GetStoreBookmarkResponse>;
