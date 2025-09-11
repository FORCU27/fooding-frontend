import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const VisitPurposeType = z.enum(['BUSINESS', 'FAMILY', 'DATE', 'FRIEND', 'ALONE', 'EVENT', 'MEETING']);
export type VisitPurposeType = z.infer<typeof VisitPurposeType>;

export const AdminReviewResponse = z.object({
  id: z.number(),
  writerId: z.number(),
  storeId: z.number(),
  serviceScore: z.number(),
  moodScore: z.number(),
  tasteScore: z.number(),
  totalScore: z.number(),
  content: z.string(),
  visitPurposeType: VisitPurposeType,
});

export type AdminReviewResponse = z.infer<typeof AdminReviewResponse>;

export const AdminReviewRequest = z.object({
  writerId: z.number().optional(),
  storeId: z.number().optional(),
  serviceScore: z.number().optional(),
  moodScore: z.number().optional(),
  tasteScore: z.number().optional(),
  totalScore: z.number().optional(),
  content: z.string().optional(),
  visitPurposeType: VisitPurposeType.optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type AdminReviewRequest = z.infer<typeof AdminReviewRequest>;

export const AdminCreateReviewRequest = z.object({
  writerId: z.number(),
  storeId: z.number(),
  serviceScore: z.number(),
  moodScore: z.number(),
  tasteScore: z.number(),
  totalScore: z.number(),
  content: z.string(),
  visitPurposeType: VisitPurposeType,
});

export type AdminCreateReviewRequest = z.infer<typeof AdminCreateReviewRequest>;

export const AdminUpdateReviewRequest = z.object({
  serviceScore: z.number().optional(),
  moodScore: z.number().optional(),
  tasteScore: z.number().optional(),
  totalScore: z.number().optional(),
  content: z.string().optional(),
  visitPurposeType: VisitPurposeType.optional(),
});

export type AdminUpdateReviewRequest = z.infer<typeof AdminUpdateReviewRequest>;

export const GetReviewListResponse = PageResponse(AdminReviewResponse);
export type GetReviewListResponse = z.infer<typeof GetReviewListResponse>;

export const GetReviewDetailResponse = ApiResponse(AdminReviewResponse);
export type GetReviewDetailResponse = z.infer<typeof GetReviewDetailResponse>;