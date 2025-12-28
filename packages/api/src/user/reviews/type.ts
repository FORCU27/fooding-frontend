import z from 'zod/v4';

import { PageInfo, PageResponse } from '../../shared';

export const SortType = z.enum(['RECENT', 'REVIEW']);
export const SortDirection = z.enum(['ASCENDING', 'DESCENDING']);
export const VISIT_PURPOSES = ['MEETING', 'DATE', 'FRIEND', 'FAMILY', 'BUSINESS', 'PARTY'] as const;
export type VisitPurpose = (typeof VISIT_PURPOSES)[number];

export type ReviewType = {
  reviewId: number;
  nickname: string | null;
  profileUrl?: string | null;
  parentId?: number | null;
  planId?: {
    timestamp: number;
    date: string;
  } | null;
  storeId?: number;
  replies: ReviewType[];
  imageUrls: string[] | null;
  content: string;
  score: {
    total: number;
    taste: number;
    mood: number;
    service: number;
  } | null;
  purpose: VisitPurpose;
  likeCount: number;
  userReviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = z.infer<typeof Review>;
export const Review: z.ZodType<ReviewType> = z.object({
  reviewId: z.number(),
  nickname: z.string().nullable(),
  profileUrl: z.string().nullable().optional(),
  parentId: z.number().nullable().optional(),
  planId: z
    .object({
      timestamp: z.number(),
      date: z.string(),
    })
    .nullable()
    .optional(),
  storeId: z.number().optional(),
  replies: z.lazy(() => z.array(Review)).default([]),
  imageUrls: z.array(z.string()).nullable(),
  content: z.string(),
  score: z
    .object({
      total: z.number(),
      taste: z.number(),
      mood: z.number(),
      service: z.number(),
    })
    .nullable(),
  purpose: z.enum(VISIT_PURPOSES),
  likeCount: z.number(),
  userReviewCount: z.number(),
  createdAt: z.iso.datetime({ local: true }),
  updatedAt: z.iso.datetime({ local: true }),
});

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
  replies: z.lazy(() => z.array(Review)).default([]),
  parentId: z.number().nullable(),
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

export type CreateReviewCommentBody = {
  parentId: number | null;
  comment: string;
};

export type ModifyReviewBody = {
  content: string;
  visitPurpose: VisitPurpose;
  taste: number;
  mood: number;
  service: number;
};

export const ReviewDetail = z.object({
  createdAt: z.string(),
  imageUrls: z.string().array(),
  likeCount: z.number(),
  profileImageUrl: z.string().nullable(),
  totalScore: z.number(),
  writerName: z.string(),
  writerReviewCount: z.number(),
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

export type GetReviewLikeResponse = z.infer<typeof GetReviewLikeResponse>;
export const GetReviewLikeResponse = z.object({
  status: z.string(),
  data: z.object({}),
});

export type SortDirection = z.infer<typeof SortDirection>;
export type SortType = z.infer<typeof SortType>;
