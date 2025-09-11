import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const StoreSortType = {
  RECENT: 'RECENT',
} as const;

export type StoreSortType = (typeof StoreSortType)[keyof typeof StoreSortType];

export const SortDirection = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const STORE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
} as const;

export type StoreStatus = (typeof STORE_STATUS)[keyof typeof STORE_STATUS];

export type AdminStoreResponse = z.infer<typeof AdminStoreResponseSchema>;
export const AdminStoreResponseSchema = z.object({
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
  status: z.string().optional().nullable(),
});

export const AdminCreateStoreRequestSchema = z.object({
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

export const AdminUpdateStoreRequestSchema = z.object({
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

export type GetStoreListResponse = z.infer<typeof GetStoreListResponse>;
export const GetStoreListResponse = PageResponse(AdminStoreResponseSchema);

export type GetStoreResponse = z.infer<typeof GetStoreResponse>;
export const GetStoreResponse = z.object({
  status: z.string().nullable(),
  data: AdminStoreResponseSchema,
});

export type AdminCreateStoreRequest = z.infer<typeof AdminCreateStoreRequestSchema>;
export type AdminUpdateStoreRequest = z.infer<typeof AdminUpdateStoreRequestSchema>;
