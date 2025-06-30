import { z } from 'zod/v4';

import { ApiResponse, PaginatedResponse, PageResponse } from '../../shared';

export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
export type BenefitType = z.infer<typeof BenefitType>;

export const RewardStatus = z.enum(['PUBLISHED', 'EARNED', 'CANCELED', 'USED']);
export type RewardStatus = z.infer<typeof RewardStatus>;

export const RewardType = z.enum(['EVENT', 'VISIT']);
export type RewardType = z.infer<typeof RewardType>;

export const Channel = z.enum(['STORE', 'EVENT_PLATFORM']);
export type Channel = z.infer<typeof Channel>;

export const UserCoupon = z.object({
  id: z.number(),
  userId: z.number(),
  couponId: z.number(),
  storeId: z.number(),
  nickname: z.string().nullable(),
  storeName: z.string(),
  name: z.string(),
  conditions: z.string().nullable(),
  benefitType: BenefitType,
  discountType: z.string(),
  discountValue: z.number(),
  used: z.boolean(),
  usedAt: z.string().nullable(),
  expiredOn: z.string(),
  createdDateAt: z.string(),
});
export type UserCoupon = z.infer<typeof UserCoupon>;

export const RewardLog = z.object({
  id: z.number(),
  storeName: z.string(),
  phoneNumber: z.string(),
  point: z.number(),
  status: RewardStatus,
  type: RewardType,
  channel: Channel,
  createdAt: z.string(),
});
export type RewardLog = z.infer<typeof RewardLog>;

export const UserCouponsResponse = PageResponse(UserCoupon);
export type UserCouponsResponse = z.infer<typeof UserCouponsResponse>;

export const UserRewardLogsResponse = ApiResponse(PaginatedResponse(RewardLog));
export type UserRewardLogsResponse = z.infer<typeof UserRewardLogsResponse>;

export const BaseSearchRequest = z.object({
  searchString: z.string(),
  pageNum: z.number(),
  pageSize: z.number(),
  storeId: z.number(),
  phoneNumber: z.string(),
});
export type BaseSearchRequest = z.infer<typeof BaseSearchRequest>;

export const UserRewardsLogRequest = BaseSearchRequest;
export type UserRewardsLogRequest = z.infer<typeof UserRewardsLogRequest>;

export const UserRewardsCouponsRequest = BaseSearchRequest.extend({
  used: z.boolean(),
});
export type UserRewardsCouponsRequest = z.infer<typeof UserRewardsCouponsRequest>;

export const PostRewardGetRequest = z.object({
  phoneNumber: z.string(),
  storeId: z.number(),
  point: z.number(),
  type: z.enum(['EVENT', 'VISIT']),
  channel: z.enum(['STORE', 'EVENT_PLATFORM']),
});
export type PostRewardGetRequest = z.infer<typeof PostRewardGetRequest>;

export const PostRewardGetResponse = ApiResponse(z.object({}).nullable());
export type PostRewardGetResponse = z.infer<typeof PostRewardGetResponse>;
