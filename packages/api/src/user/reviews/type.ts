import { z } from 'zod';

export const ReviewSortType = z.enum(['RECENT', 'REVIEW']);
export const SortDirection = z.enum(['ASCENDING', 'DESCENDING']);

export const UserRetrieveReviewRequest = z.object({
  sortType: ReviewSortType,
  sortDirection: SortDirection,
  pageNum: z.number().min(1),
  pageSize: z.number().min(1),
});

export const UserReviewResponse = z.object({
  reviewId: z.number(),
  nickname: z.string(),
  profileUrl: z.string().nullable(),
  imageUrls: z.array(z.string()),
  content: z.string(),
  score: z.object({
    total: z.number(),
    taste: z.number(),
    mood: z.number(),
    service: z.number(),
  }),
  purpose: z.string(),
  likeCount: z.number(),
  userReviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  planId: z.string().nullable(),
});

export const PageInfo = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

export const GetMyReviewListData = z.object({
  list: z.array(UserReviewResponse),
  pageInfo: PageInfo,
});

export const GetMyReviewListResponse = z.object({
  status: z.string(),
  data: GetMyReviewListData,
});

export type UserRetrieveReviewRequest = z.infer<typeof UserRetrieveReviewRequest>;
export type UserReviewResponse = z.infer<typeof UserReviewResponse>;
export type PageInfo = z.infer<typeof PageInfo>;
export type GetMyReviewListData = z.infer<typeof GetMyReviewListData>;
export type GetMyReviewListResponse = z.infer<typeof GetMyReviewListResponse>;
export type ReviewSortType = z.infer<typeof ReviewSortType>;
export type SortDirection = z.infer<typeof SortDirection>;
