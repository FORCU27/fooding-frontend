import { z } from 'zod/v4';
import { ApiResponse, PageResponse } from '../../shared';

export const StoreServiceType = z.enum(['WAITING', 'REWARD']);
export type StoreServiceType = z.infer<typeof StoreServiceType>;

export const StoreServiceResponse = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  type: StoreServiceType,
  activation: z.boolean(),
  createdAt: z.string(),
  endedAt: z.string().nullable(),
});

export type StoreServiceResponse = z.infer<typeof StoreServiceResponse>;

export const CreateStoreServiceRequest = z.object({
  storeId: z.number(),
  type: StoreServiceType,
  userId: z.number(),
});

export type CreateStoreServiceRequest = z.infer<typeof CreateStoreServiceRequest>;

export const RetrieveStoreServiceRequest = z.object({
  storeId: z.number().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type RetrieveStoreServiceRequest = z.infer<typeof RetrieveStoreServiceRequest>;

export const GetStoreServiceListResponse = PageResponse(StoreServiceResponse);
export type GetStoreServiceListResponse = z.infer<typeof GetStoreServiceListResponse>;

export const GetStoreServiceDetailResponse = ApiResponse(StoreServiceResponse);
export type GetStoreServiceDetailResponse = z.infer<typeof GetStoreServiceDetailResponse>;