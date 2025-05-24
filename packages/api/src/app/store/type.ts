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

export type GetStoreServiceListResponse = z.infer<typeof GetStoreServiceListResponse>;
