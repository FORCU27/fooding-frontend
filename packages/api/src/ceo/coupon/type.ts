import { z } from 'zod';

// Enum 타입들
export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
export const CouponType = z.enum(['FIRST_COME_FIRST_SERVED', 'REGULAR_ONLY']);
export const DiscountType = z.enum(['PERCENTAGE', 'FIXED']);
export const ProvideType = z.enum(['ALL', 'REGULAR']);
export const CouponStatus = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']);

// 쿠폰 생성/수정 요청 바디
export const CreateCouponBody = z.object({
  storeId: z.number(),
  benefitType: BenefitType,
  type: CouponType,
  discountType: DiscountType.optional(),
  provideType: ProvideType,
  name: z.string().min(1, '쿠폰 이름을 입력해주세요'),
  conditions: z.string().optional(),
  totalQuantity: z.number().optional(),
  discountValue: z.number().optional(),
  giftItem: z.string().optional(),
  minOrderAmount: z.number().optional(),
  issueStartOn: z.string(), // YYYY-MM-DD
  issueEndOn: z.string(), // YYYY-MM-DD
  expiredOn: z.string(), // YYYY-MM-DD
  status: CouponStatus,
});

export type CreateCouponBody = z.infer<typeof CreateCouponBody>;



// 쿠폰 스키마
export const CouponSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  benefitType: BenefitType,
  type: CouponType,
  discountType: DiscountType.nullable(),
  provideType: ProvideType,
  name: z.string(),
  conditions: z.string().nullable(),
  totalQuantity: z.number().nullable(),
  issuedQuantity: z.number(),
  discountValue: z.number().nullable(),
  giftItem: z.string().nullable(),
  minOrderAmount: z.number().nullable(),
  issueStartOn: z.string(),
  issueEndOn: z.string(),
  expiredOn: z.string(),
  status: CouponStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 쿠폰 타입 정의
export type CouponSchema = z.infer<typeof CouponSchema>;
export type CreateCouponResponse = number; // 생성된 쿠폰 ID
export type UpdateCouponResponse = null; // 수정 응답
export type GetCouponResponse = CouponSchema; // 조회 응답

// 쿠폰 목록 조회 응답 타입
export type GetCouponListResponse = {
  content: CouponSchema[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  hasNext: boolean;
};

// 쿠폰 목록 조회 파라미터
export type GetCouponListParams = {
  storeId: number;
  page?: number;
  size?: number;
  sort?: string;
  status?: string;
};
