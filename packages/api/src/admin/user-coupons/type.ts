import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';
import { BenefitType, DiscountType } from '../coupons/type';

export const UserCouponStatus = z.enum(['AVAILABLE', 'REQUESTED', 'USED']);
export type UserCouponStatus = z.infer<typeof UserCouponStatus>;

export const AdminUserCouponResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  couponId: z.number().nullable(),
  storeId: z.number().nullable(),
  nickname: z.string().nullable(),
  storeName: z.string().nullable(),
  name: z.string(),
  conditions: z.string().nullable(),
  benefitType: BenefitType,
  discountType: DiscountType,
  discountValue: z.number(),
  status: UserCouponStatus,
  usedAt: z.string().nullable(),
  expiredOn: z.string().nullable(),
  createdDateAt: z.string(),
  tableNumber: z.string().nullable(),
  point: z.number().nullable(),
});
export type AdminUserCouponResponse = z.infer<typeof AdminUserCouponResponseSchema>;

export const AdminIssueCouponRequestSchema = z.object({
  userId: z.number(),
  couponId: z.number(),
});
export type AdminIssueCouponRequest = z.infer<typeof AdminIssueCouponRequestSchema>;

export const AdminGiftCouponRequestSchema = z.object({
  userId: z.number(),
  storeId: z.number().nullable().optional(),
  benefitType: BenefitType,
  discountType: DiscountType,
  name: z.string(),
  conditions: z.string().nullable().optional(),
  discountValue: z.number(),
  expiredOn: z.string().nullable().optional(),
});
export type AdminGiftCouponRequest = z.infer<typeof AdminGiftCouponRequestSchema>;

export const AdminUserCouponSearchParamsSchema = z.object({
  pageNum: z.number().optional(),
  pageSize: z.number().optional(),
  searchString: z.string().optional(),
  userId: z.number().optional(),
  storeId: z.number().optional(),
  couponId: z.number().optional(),
  status: UserCouponStatus.optional(),
});
export type AdminUserCouponSearchParams = z.infer<typeof AdminUserCouponSearchParamsSchema>;

export const GetAdminUserCouponListResponse = PageResponse(AdminUserCouponResponseSchema);
export type GetAdminUserCouponListResponse = z.infer<typeof GetAdminUserCouponListResponse>;

export const GetAdminUserCouponResponse = ApiResponse(AdminUserCouponResponseSchema);
export type GetAdminUserCouponResponse = z.infer<typeof GetAdminUserCouponResponse>;
