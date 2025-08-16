import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type GetStoreResponseV2 = z.infer<typeof GetStoreResponseV2>;
export const GetStoreResponseV2 = z.object({
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
  stations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      line: z.string(),
      address: z.string(),
    }),
  ),
  parkingAvailable: z.boolean(),
  newOpen: z.boolean(),
  takeOut: z.boolean(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type GetStoreV2ApiResponse = z.infer<typeof GetStoreV2ApiResponse>;
export const GetStoreV2ApiResponse = ApiResponse(GetStoreResponseV2);

export type PutStoreBody = z.infer<typeof PutStoreBody>;
export const PutStoreBody = z
  .object({
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
    isParkingAvailable: z.boolean(),
    isNewOpen: z.boolean(),
    isTakeOut: z.boolean(),
    latitude: z.number(),
    longitude: z.number(),
  })
  .partial();
