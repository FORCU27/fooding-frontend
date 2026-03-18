import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type GetStoreResponseV2 = z.infer<typeof GetStoreResponseV2>;
export const GetStoreResponseV2 = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  regionId: z.string().nullable(),
  address: z.string(),
  addressDetail: z.string().nullable(),
  category: z.string(),
  description: z.string().nullable(),
  contactNumber: z.string(),
  direction: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  visitCount: z.number(),
  reviewCount: z.number(),
  bookmarkCount: z.number(),
  stations: z.array(z.any()).optional(), // 실제 응답에서 배열이 비어있으므로 any로 처리
});

export type GetStoreV2ApiResponse = z.infer<typeof GetStoreV2ApiResponse>;
export const GetStoreV2ApiResponse = ApiResponse(GetStoreResponseV2);

export type PutStoreBody = z.infer<typeof PutStoreBody>;
export const PutStoreBody = z
  .object({
    name: z.string(),
    address: z.string(),
    addressDetail: z.string().nullable(),
    category: z.string(),
    description: z.string().nullable(),
    contactNumber: z.string(),
    direction: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  })
  .partial();
