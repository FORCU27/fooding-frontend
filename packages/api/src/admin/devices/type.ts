import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const AdminDeviceResponseSchema = z.object({
  id: z.number(),
  platform: z.string(),
  name: z.string(),
  packageName: z.string(),
  osVersion: z.string(),
  installedAt: z.string(),
  lastConnectedAt: z.string(),
});

export const RetrieveDeviceRequestSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  storeId: z.number().optional(),
  searchString: z.string().optional(),
  userId: z.number().optional(),
});

export type AdminDeviceResponse = z.infer<typeof AdminDeviceResponseSchema>;
export type RetrieveDeviceRequest = z.infer<typeof RetrieveDeviceRequestSchema>;

export const GetAdminDeviceListResponse = PageResponse(AdminDeviceResponseSchema);