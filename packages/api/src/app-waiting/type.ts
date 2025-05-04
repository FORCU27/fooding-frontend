import { z } from 'zod';


// 웨이팅 목록 조회 요청 타입
export const WaitingListRequest = z.object({
    search: z.object({
        searchString: z.string(),
        pageNum: z.number(),
        pageSize: z.number(),
    }),
    status: z.string(), // "WAITING"
});

// 웨이팅 목록 조회 응답 타입
export const WaitingUser = z.object({
    id: z.number(),
    storeId: z.number(),
    name: z.string(),
    phoneNumber: z.string(),
    count: z.number(),
  });
  
export const WaitingItem = z.object({
    id: z.number(),
    storeId: z.number(),
    user: WaitingUser,
    callNumber: z.number(),
    channel: z.string(),
    infantChairCount: z.number(),
    infantCount: z.number(),
    adultCount: z.number(),
    memo: z.string(),
  });
  
export const PageInfo = z.object({
    pageNum: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
  });
  
export const WaitingListResponse = z.object({
    status: z.string(), // "OK"
    data: z.object({
      list: z.array(WaitingItem),
      pageInfo: PageInfo,
    }),
  });

// 웨이팅 등록 요청 타입
export const WaitingCreateRequest = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    termsAgreed: z.boolean(),
    privacyPolicyAgreed: z.boolean(),
    thirdPartyAgreed: z.boolean(),
    marketingConsent: z.boolean(),
    infantChairCount: z.number(),
    infantCount: z.number(),
    adultCount: z.number(),
});

// 웨이팅 등록 응답 타입
export const WaitingCreateResponse = z.object({
    status: z.string(), // "OK"
    data: z.object({
        callNumber: z.number(),
    }),
});

// 응답 타입


export type WaitingListRequest = z.infer<typeof WaitingListRequest>;
export type WaitingListResponse = z.infer<typeof WaitingListResponse>;
export type WaitingCreateRequest = z.infer<typeof WaitingCreateRequest>;
export type WaitingCreateResponse = z.infer<typeof WaitingCreateResponse>;
