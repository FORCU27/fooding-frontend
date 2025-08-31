import z from 'zod/v4';

import { PageResponse } from '../../shared';

export type GetRewardListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  storeId?: number;
  phoneNumber?: string;
};

export const RewardType = z.enum(['EVENT', 'VISIT']);
export type RewardType = z.infer<typeof RewardType>;

export const RewardStatus = z.enum(['EARNED', 'CANCELED', 'USED']);
export type RewardStatus = z.infer<typeof RewardStatus>;

export const RewardChannel = z.enum(['STORE', 'EVENT_PLATFORM']);
export type RewardChannel = z.infer<typeof RewardChannel>;

export type Reward = z.infer<typeof Reward>;
export const Reward = z.object({
  id: z.number(),
  storeName: z.string(),
  phoneNumber: z.string(),
  point: z.number(),
  userId: z.number(),
});

export type GetUserRewardResponse = z.infer<typeof GetUserRewardResponse>;
export const GetUserRewardResponse = PageResponse(Reward);

export type GetUserRewardPointResponse = z.infer<typeof GetUserRewardPointResponse>;
export const GetUserRewardPointResponse = z.object({
  status: z.string(),
  data: z.number(),
});

export type RewardLog = z.infer<typeof RewardLog>;
export const RewardLog = z.object({
  id: z.number(),
  storeName: z.string(),
  storeId: z.number(),
  phoneNumber: z.string(),
  point: z.number(),
  status: RewardStatus,
  type: RewardType,
  channel: RewardChannel,
  createdAt: z.string(),
});

export type GetUserRewardLogResponse = z.infer<typeof GetUserRewardLogResponse>;
export const GetUserRewardLogResponse = PageResponse(RewardLog);
