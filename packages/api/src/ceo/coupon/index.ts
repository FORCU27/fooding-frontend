import {
  CreateCouponBody,
  UpdateCouponBody,
  GetCouponListParams,
  GetCouponResponse,
  GetCouponListResponse,
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
  getCoupon: async (id: number): Promise<GetCouponResponse> => {
    const response = await api.get<GetCouponResponse>(`${ENDPOINT}/${id}`);
    console.log('getCoupon API response:', response);
    return response;
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

  // 쿠폰 상태 변경
  updateCouponStatus: async (id: number, status: 'ACTIVE' | 'INACTIVE') => {
    const response = await api.patch(`${ENDPOINT}/${id}/status`, { status });
    return response;
  },

  // 쿠폰 삭제
  deleteCoupon: async (id: number) => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};

// Export types
export * from './type';