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
  address: z.string(),
  addressDetail: z.string().nullable(),
  category: z.string(),
  description: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  stations: z.array(z.any()),
});

export type Store = z.infer<typeof Store>;

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;
