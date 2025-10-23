import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const DevicePlatform = z.enum(['IOS', 'ANDROID']);
export type DevicePlatform = z.infer<typeof DevicePlatform>;

export const CeoDeviceResponseSchema = z.object({
  id: z.number(),
  platform: DevicePlatform,
  name: z.string(),
  packageName: z.string(),
  osVersion: z.string(),
  installedAt: z.string(),
  lastConnectedAt: z.string(),
});

export const CeoDeviceConnnectRequestSchema = z.object({
  name: z.string(),
  platform: z.string(),
  osVersion: z.string(),
  appVersion: z.string(),
  packageName: z.string(),
  deviceId: z.number(),
  userId: z.number(),
});

export const GetCeoDeviceListResponse = PageResponse(CeoDeviceResponseSchema);
