import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type GetStoreResponse = z.infer<typeof GetStoreResponse>;
export const GetStoreResponse = z.object({
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
    })
  ),
  parkingAvailable: z.boolean(),
  newOpen: z.boolean(),
  takeOut: z.boolean(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type GetStoreApiResponse = z.infer<typeof GetStoreApiResponse>;
export const GetStoreApiResponse = ApiResponse(GetStoreResponse);

export type GetStoreListResponse = z.infer<typeof GetStoreListResponse>;
export const GetStoreListResponse = ApiResponse(GetStoreResponse);

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
