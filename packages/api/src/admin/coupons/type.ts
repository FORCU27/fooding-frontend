import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
export type BenefitType = z.infer<typeof BenefitType>;

export const CouponType = z.enum(['GENERAL', 'FIRST_COME_FIRST_SERVED']);
export type CouponType = z.infer<typeof CouponType>;

export const DiscountType = z.enum(['PERCENT', 'FIXED']);
export type DiscountType = z.infer<typeof DiscountType>;

export const ProvideType = z.enum(['ALL', 'REGULAR_CUSTOMER']);
export type ProvideType = z.infer<typeof ProvideType>;

export const CouponStatus = z.enum(['ACTIVE', 'INACTIVE']);
export type CouponStatus = z.infer<typeof CouponStatus>;

export const AdminCouponResponseSchema = z.object({
  id: z.number(),
  storeId: z.number().nullable(),
  storeName: z.string().nullable(),
  benefitType: BenefitType,
  type: CouponType,
  discountType: DiscountType,
  provideType: ProvideType,
  name: z.string(),
  conditions: z.string().nullable(),
  totalQuantity: z.number().nullable(),
  issuedQuantity: z.number(),
  discountValue: z.number(),
  issueStartOn: z.string().nullable(),
  issueEndOn: z.string().nullable(),
  expiredOn: z.string().nullable(),
  status: CouponStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type AdminCouponResponse = z.infer<typeof AdminCouponResponseSchema>;

export const AdminCreateCouponRequestSchema = z.object({
  storeId: z.number().nullable().optional(),
  benefitType: BenefitType,
  type: CouponType,
  discountType: DiscountType,
  provideType: ProvideType,
  name: z.string(),
  conditions: z.string().optional(),
  totalQuantity: z.number().nullable().optional(),
  discountValue: z.number().positive(),
  issueStartOn: z.string().optional(),
  issueEndOn: z.string().optional(),
  expiredOn: z.string().optional(),
  status: CouponStatus,
});
export type AdminCreateCouponRequest = z.infer<typeof AdminCreateCouponRequestSchema>;

export const AdminUpdateCouponRequestSchema = z.object({
  storeId: z.number().nullable().optional(),
  benefitType: BenefitType,
  type: CouponType,
  discountType: DiscountType,
  provideType: ProvideType,
  name: z.string(),
  conditions: z.string().optional(),
  totalQuantity: z.number().nullable().optional(),
  discountValue: z.number().positive(),
  issueStartOn: z.string(),
  issueEndOn: z.string().nullable().optional(),
  expiredOn: z.string().nullable().optional(),
  status: CouponStatus,
});
export type AdminUpdateCouponRequest = z.infer<typeof AdminUpdateCouponRequestSchema>;

export const GetCouponListResponse = PageResponse(AdminCouponResponseSchema);
export type GetCouponListResponse = z.infer<typeof GetCouponListResponse>;

export const GetCouponResponse = ApiResponse(AdminCouponResponseSchema);
export type GetCouponResponse = z.infer<typeof GetCouponResponse>;

export type AdminCouponSearchParams = {
  pageNum?: number;
  pageSize?: number;
  searchString?: string;
  status?: CouponStatus;
  storeId?: number;
};
