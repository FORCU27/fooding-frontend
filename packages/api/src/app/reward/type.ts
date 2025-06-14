import { z } from 'zod';

import { ApiResponse, PageInfo, PaginatedResponse } from '../../shared';

export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
export type BenefitType = z.infer<typeof BenefitType>;

export const RewardStatus = z.enum(['PUBLISHED', 'EARNED', 'CANCELED', 'USED']);
export type RewardStatus = z.infer<typeof RewardStatus>;

export const RewardType = z.enum(['EVENT', 'VISIT']);
export type RewardType = z.infer<typeof RewardType>;

export const Chanel = z.enum(['STORE', 'EVENT_PLATFORM']);
export type Chanel = z.infer<typeof Chanel>;

export const UserCoupon = z.object({
  id: z.number(),
  userId: z.number(),
  couponId: z.number(),
  storeId: z.number(),
  nickname: z.string(),
  storeName: z.string(),
  name: z.string(),
  conditions: z.string(),
  benefitType: BenefitType,
  discountValue: z.number(),
  used: z.boolean(),
  usedAt: z.string(),
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
  channel: Chanel,
});
export type RewardLog = z.infer<typeof RewardLog>;

export const UserCoupons = z.object({
  list: z.array(UserCoupon),
  pageInfo: PageInfo,
});
export type UserCoupons = z.infer<typeof UserCoupons>;

export const UserCouponsResponse = ApiResponse(UserCoupons);
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
