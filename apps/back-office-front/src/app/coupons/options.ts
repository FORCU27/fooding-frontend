import {
  BenefitType,
  CouponStatus,
  CouponType,
  DiscountType,
  ProvideType,
  UserCouponStatus,
} from '@repo/api/admin';

type Option<T> = {
  value: T;
  label: string;
};

export const BENEFIT_TYPE_OPTIONS: Option<BenefitType>[] = [
  { value: 'DISCOUNT', label: '할인' },
  { value: 'GIFT', label: '증정' },
];

export const COUPON_TYPE_OPTIONS: Option<CouponType>[] = [
  { value: 'GENERAL', label: '일반' },
  { value: 'FIRST_COME_FIRST_SERVED', label: '선착순' },
];

export const DISCOUNT_TYPE_OPTIONS: Option<DiscountType>[] = [
  { value: 'FIXED', label: '고정 금액' },
  { value: 'PERCENT', label: '퍼센트' },
];

export const PROVIDE_TYPE_OPTIONS: Option<ProvideType>[] = [
  { value: 'ALL', label: '전체 고객' },
  { value: 'REGULAR_CUSTOMER', label: '단골 고객' },
];

export const COUPON_STATUS_OPTIONS: Option<CouponStatus>[] = [
  { value: 'ACTIVE', label: '활성화' },
  { value: 'INACTIVE', label: '비활성화' },
];

export const USER_COUPON_STATUS_OPTIONS: Option<UserCouponStatus | 'all'>[] = [
  { value: 'all', label: '전체' },
  { value: 'AVAILABLE', label: '사용 가능' },
  { value: 'REQUESTED', label: '사용 요청' },
  { value: 'USED', label: '사용 완료' },
];

export const toLabelMap = <T extends string>(options: Option<T>[]) =>
  options.reduce<Record<T, string>>((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {} as Record<T, string>);

export const BENEFIT_TYPE_LABEL = toLabelMap(BENEFIT_TYPE_OPTIONS);
export const COUPON_TYPE_LABEL = toLabelMap(COUPON_TYPE_OPTIONS);
export const DISCOUNT_TYPE_LABEL = toLabelMap(DISCOUNT_TYPE_OPTIONS);
export const PROVIDE_TYPE_LABEL = toLabelMap(PROVIDE_TYPE_OPTIONS);
export const COUPON_STATUS_LABEL = toLabelMap(COUPON_STATUS_OPTIONS);
export const USER_COUPON_STATUS_LABEL = toLabelMap(
  USER_COUPON_STATUS_OPTIONS.filter((option): option is Option<UserCouponStatus> => option.value !== 'all'),
);
