import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type CreateStoreBody = {
  name: string;
};

export const Store = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  regionId: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  information: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  visitCount: z.number(),
  reviewCount: z.number(),
  bookmarkCount: z.number(),
  stations: z.string(),
  parkingAvailable: z.boolean(),
  newOpen: z.boolean(),
  takeOut: z.boolean(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type Store = z.infer<typeof Store>;

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;
