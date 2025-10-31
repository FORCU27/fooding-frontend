import {
  CreateCouponBody,
  UpdateCouponBody,
  GetCouponListParams,
  GetCouponResponse,
  GetCouponListResponse,
  CouponSchema,
  GetCouponUsageParams,
  GetCouponUsageResponse,
  GiftCouponBody,
  SearchUserParams,
  SearchUserResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/coupons';

export const couponApiV2 = {
  // 쿠폰 생성
  createCoupon: async (body: CreateCouponBody): Promise<number> => {
    const response = await api.post<number>(ENDPOINT, body);
    return response;
  },

  // 쿠폰 단일 조회
  getCoupon: async (id: number): Promise<CouponSchema> => {
    const response = await api.get<GetCouponResponse>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  // 쿠폰 목록 조회
  getCouponList: async (params: GetCouponListParams): Promise<GetCouponListResponse['data']> => {
    const response = await api.get<GetCouponListResponse>(ENDPOINT, { params });
    return response.data;
  },

  // 쿠폰 수정
  updateCoupon: async (id: number, body: UpdateCouponBody): Promise<null> => {
    const response = await api.put<null>(`${ENDPOINT}/${id}`, body);
    return response;
  },

  // 쿠폰 상태 변경 - PUT 요청으로 status만 변경
  updateCouponStatus: async (id: number, status: 'ACTIVE' | 'INACTIVE') => {
    // 먼저 기존 쿠폰 정보 조회
    const existingCoupon = await api.get<GetCouponResponse>(`${ENDPOINT}/${id}`);
    const couponData = existingCoupon.data;

    // UpdateCouponBody에 맞게 필요한 필드만 전송
    const updateBody: UpdateCouponBody = {
      storeId: couponData.storeId,
      benefitType: couponData.benefitType,
      type: couponData.type as 'GENERAL' | 'FIRST_COME_FIRST_SERVED',
      discountType: couponData.discountType || 'FIXED',
      provideType: couponData.provideType,
      name: couponData.name,
      conditions: couponData.conditions || undefined,
      totalQuantity: couponData.totalQuantity || undefined,
      discountValue: couponData.discountValue || undefined,
      giftItem: couponData.giftItem || undefined,
      minOrderAmount: couponData.minOrderAmount || undefined,
      issueStartOn: couponData.issueStartOn,
      issueEndOn: couponData.issueEndOn || undefined,
      expiredOn: couponData.expiredOn || undefined,
      status: status,
    };

    const response = await api.put(`${ENDPOINT}/${id}`, updateBody);
    return response;
  },

  // 쿠폰 삭제
  deleteCoupon: async (id: number) => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  // 쿠폰 사용내역 조회
  getCouponUsages: async (
    couponId: number,
    params: GetCouponUsageParams,
  ): Promise<GetCouponUsageResponse['data']> => {
    const response = await api.get<GetCouponUsageResponse>(`${ENDPOINT}/${couponId}/usages`, {
      params,
    });
    return response.data;
  },

  // 쿠폰 선물
  giftCoupon: async (body: GiftCouponBody): Promise<void> => {
    await api.post('/ceo/user-coupons/gift', body);
  },

  // 고객 검색 (단골 고객)
  searchUsers: async (params: SearchUserParams): Promise<SearchUserResponse['data']> => {
    const response = await api.get<SearchUserResponse>('/ceo/users/search', { params });
    return response.data;
  },
};

// Export types
export * from './type';
