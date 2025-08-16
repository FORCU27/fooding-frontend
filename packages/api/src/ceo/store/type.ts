import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type CreateStoreBody = {
  name: string;
};

export const SubwayStation = z.object({
  id: z.number(),
  name: z.string(),
  line: z.string(),
  address: z.string(),
});

export const Store = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  regionId: z.string().nullable(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string().nullable(),
  contactNumber: z.string(),
  direction: z.string(),
  information: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  visitCount: z.number(),
  reviewCount: z.number(),
  bookmarkCount: z.number(),
  stations: z.array(SubwayStation),
  parkingAvailable: z.boolean().nullable(),
  newOpen: z.boolean().nullable(),
  takeOut: z.boolean().nullable(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type Store = z.infer<typeof Store>;

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;
