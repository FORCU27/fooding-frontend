import { z } from 'zod';

export const WaitingStatus = z.enum(['WAITING_OPEN', 'IMMEDIATE_ENTRY', 'PAUSED', 'WAITING_CLOSE']);
export type WaitingStatus = z.infer<typeof WaitingStatus>;

// 요청 타입
export const WaitingListRequest = z.object({
  search: z.object({
    searchString: z.string(),
    pageNum: z.number(),
    pageSize: z.number(),
  }),
  status: WaitingStatus,
});

// 응답 타입
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

export type WaitingListRequest = z.infer<typeof WaitingListRequest>;
export type WaitingListResponse = z.infer<typeof WaitingListResponse>;
