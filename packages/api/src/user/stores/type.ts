import z from 'zod';

import { PageResponse } from '../../shared';

export type Store = z.infer<typeof Store>;
export const Store = z.object({
  id: z.number(),
  name: z.string(),
  mainImage: z.string().nullable(),
  city: z.string(),
  visitCount: z.number(),
  reviewCount: z.number(),
  averageRating: z.number(),
  estimatedWaitingTimeMinutes: z.number().nullable(),
  //임의
  isBookMarded: z.boolean().optional(),
  isFinished: z.boolean().optional(),
});

export type StoreInfo = z.infer<typeof StoreInfo>;
export const StoreInfo = Store.extend({
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type GetStoreListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  sortType?: string;
  sortDirection?: string;
};

export type GetStoreListReponse = z.infer<typeof GetStoreListReponse>;
export const GetStoreListReponse = PageResponse(Store);
