import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

// CEO 리워드 히스토리 스키마
export const CeoRewardHistoryResponseSchema = z.object({
  id: z.number(),
  phoneNumber: z.string(),
  storeId: z.number(),
  rewardType: z.string(),
  channel: z.string(),
  category: z.string(),
  createdAt: z.string(),
  target: z.string(),
  operation: z.string(),
});

export type CeoRewardHistoryResponse = z.infer<typeof CeoRewardHistoryResponseSchema>;

// API 응답 타입
export const GetCeoRewardHistoryListResponse = ApiResponse(
  z.array(CeoRewardHistoryResponseSchema),
);

export type GetCeoRewardHistoryListResponse = z.infer<typeof GetCeoRewardHistoryListResponse>;
