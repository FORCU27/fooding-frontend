import { z } from 'zod';

import { PageInfoSchema } from '../../shared';

export const Store = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type Store = z.infer<typeof Store>;

export const GetStoresResponse = z.object({
  list: z.array(Store),
  pageInfo: PageInfoSchema,
});

export type GetStoresResponse = z.infer<typeof GetStoresResponse>;

export const StoreService = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const StoreServiceItem = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  type: z.string(),
  activation: z.boolean(),
  createdAt: z.string(),
  endedAt: z.string().nullable(),
});

export const GetStoreServiceListResponse = z.object({
  status: z.string(),
  data: z.array(StoreServiceItem),
});

export const GetStoreWaitingResponse = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  type: z.string(),
  activation: z.boolean(),
});

export const WaitingUser = z.object({
  id: z.number(),
  storeId: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  count: z.number(),
});

export const GetWaitingDetailResponse = z.object({
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

export const GetStoresWaitingResponse = z.object({
  status: z.string(),
  data: z.object({
    list: z.array(GetWaitingDetailResponse),
    pageInfo: PageInfoSchema,
  }),
});

export const PostStoreWaitingRequest = z.object({
  data: z.object({
    callNumber: z.number(),
  }),
  status: z.string(),
});

export const CreateStoreWaitingRequest = z.object({
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

export type CreateStoreWaitingRequest = z.infer<typeof CreateStoreWaitingRequest>;

export type WaitingUser = z.infer<typeof WaitingUser>;
export type GetWaitingDetailResponse = z.infer<typeof GetWaitingDetailResponse>;

export type GetStoreServiceListResponse = z.infer<typeof GetStoreServiceListResponse>;
