import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export type GetReviewParams = {
  searchString?: string;
  pageNum: number;
  pageSize: number;
  ceoId: number;
  storeId: number;
};

export type PostReviewReplyParams = {
  userId: number;
  content: string;
};

export const ReviewReply = z
  .object({
    id: z.number(),
    content: z.string(),
    writerId: z.number(),
    writerName: z.string(),
    writerProfileImage: z.string(),
    createdAt: z.string(),
  })
  .loose();

export const Review = z.object({
  id: z.number(),
  storeId: z.number(),
  content: z.string(),
  visitPurposeType: z.enum(['MEETING', 'DATE', 'FRIEND', 'FAMILY', 'BUSINESS', 'PARTY']),
  writerId: z.number(),
  writerName: z.string(),
  writerProfileImage: z.string().nullable(),
  replies: z.array(ReviewReply).nullable(),
  // writerReviewCount: z.number(), <- TODO
  createdAt: z.string(),
  totalScore: z.number().optional(),
  tasteScore: z.number().optional(),
  moodScore: z.number().optional(),
  serviceScore: z.number().optional(),
});
export type Review = z.infer<typeof Review>;

export const GetReviewResponse = PageResponse(Review);
export type GetReviewResponse = z.infer<typeof GetReviewResponse>;
