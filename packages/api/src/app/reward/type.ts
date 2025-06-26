import { z } from 'zod/v4';

import { ApiResponse, PaginatedResponse, PageResponse } from '../../shared';

export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
export type BenefitType = z.infer<typeof BenefitType>;

export const DiscountType = z.enum(['PERCENT', 'FIXED']);
export type DiscountType = z.infer<typeof DiscountType>;

export const CouponStatus = z.enum(['AVAILABLE', 'REQUESTED', 'USED']);
export type CouponStatus = z.infer<typeof CouponStatus>;

export const RewardStatus = z.enum(['PUBLISHED', 'EARNED', 'CANCELED', 'USED']);
export type RewardStatus = z.infer<typeof RewardStatus>;

export const RewardType = z.enum(['EVENT', 'VISIT']);
export type RewardType = z.infer<typeof RewardType>;

export const Channel = z.enum(['STORE', 'EVENT_PLATFORM']);
export type Channel = z.infer<typeof Channel>;

export const UserCoupon = z.object({
  id: z.number(),
  userId: z.number(),
  couponId: z.number().nullable(),
  storeId: z.number().nullable(),
  nickname: z.string().optional(), // 임시로 optional 처리
  storeName: z.string().nullable(),
  name: z.string(),
  conditions: z.string().nullable(),
  benefitType: BenefitType,
  discountType: DiscountType,
  discountValue: z.number(),
  status: CouponStatus,
  usedAt: z.string().nullable(),
  expiredOn: z.string().nullable(),
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
