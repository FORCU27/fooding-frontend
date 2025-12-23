import z from 'zod/v4';

import { PageInfo, PageResponse } from '../../shared';

export const SortType = z.enum(['RECENT', 'REVIEW']);
export const SortDirection = z.enum(['ASCENDING', 'DESCENDING']);
export const VISIT_PURPOSES = ['MEETING', 'DATE', 'FRIEND', 'FAMILY', 'BUSINESS', 'PARTY'] as const;
export type VisitPurpose = (typeof VISIT_PURPOSES)[number];

export type MyReview = z.infer<typeof MyReview>;
export const MyReview = z.object({
  reviewId: z.number(),
  nickname: z.string(),
  profileUrl: z.string().optional(),
  imageUrls: z.string().array().nullable(),
  content: z.string(),
  storeId: z.number(),
  score: z.object({
    total: z.number(),
    taste: z.number(),
    mood: z.number(),
    service: z.number(),
  }),
  purpose: z.enum(VISIT_PURPOSES),
  likeCount: z.number(),
  userReviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  planId: z
    .object({
      timestamp: z.number(),
      date: z.string(),
    })
    .nullable(),
  replies: z.string().array().nullable(),
  parentId: z.number().nullable(),
});

export type Review = z.infer<typeof Review>;
export const Review = z.object({
  reviewId: z.number(),
  nickname: z.string().nullable(),
  profileUrl: z.string().nullable().optional(),
  imageUrls: z.string().array().nullable(),
  content: z.string(),
  score: z.object({
    total: z.number(),
    taste: z.number(),
    mood: z.number(),
    service: z.number(),
  }),
  purpose: z.enum(VISIT_PURPOSES),
  likeCount: z.number(),
  userReviewCount: z.number(),
  createdAt: z.iso.datetime({ local: true }),
  updatedAt: z.iso.datetime({ local: true }),
});

export type CreateReviewBody = {
  storeId: number;
  userId: number;
  content: string;
  visitPurpose: VisitPurpose;
  total: number;
  taste: number;
  mood: number;
  service: number;
  imageUrls: string[];
};

export type ModifyReviewBody = {
  content: string;
  visitPurpose: VisitPurpose;
  taste: number;
  mood: number;
  service: number;
};

export const ReviewDetail = z.object({
  totalScore: z.number(),
  imageUrls: z.string().array().nullable(),
  likeCount: z.number(),
  writerName: z.string(),
  createdAt: z.string(),
  writerReviewCount: z.number(),
  profileImageUrl: z.string().nullable(),
});

export type GetReviewDetailResponse = z.infer<typeof GetReviewDetailResponse>;
export const GetReviewDetailResponse = z.object({
  status: z.string(),
  data: ReviewDetail,
});

export type GetMyReviewListRequest = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  writerId?: number;
  parentId?: number;
  sortType?: SortType;
  sortDirection?: SortDirection;
};

export type GetMyReviewResponse = z.infer<typeof GetMyReviewResponse>['data'];
export const GetMyReviewResponse = PageResponse(MyReview);

export type GetReviewListRequest = {
  id: number;
  params: {
    sortType: SortType;
    sortDirection: SortDirection;
    writerId?: number;
    parentId?: number;
    pageNum?: number;
    pageSize?: number;
  };
};

export const GetStoreReviewListResponse = z.object({
  status: z.string(),
  data: z.object({
    list: z.array(Review),
    pageInfo: PageInfo,
  }),
});
export type GetStoreReviewListResponse = z.infer<typeof GetStoreReviewListResponse>;

export type GetReviewResponse = z.infer<typeof GetReviewResponse>;
export const GetReviewResponse = z.object({
  status: z.string(),
  data: z.null(),
});

export type SortDirection = z.infer<typeof SortDirection>;
export type SortType = z.infer<typeof SortType>;
