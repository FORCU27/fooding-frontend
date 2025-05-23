import z from 'zod';

import { createPageResponseSchema } from '../../shared';

export const CeoDeviceResponseSchema = z.object({
  id: z.number(),
  deviceType: z.string(),
  name: z.string(),
  osVersion: z.string(),
  installedAt: z.string(),
  lastConnectedAt: z.string(),
  serviceType: z.string(),
});

export const CeoDeviceConnnectRequestSchema = z.object({
  name: z.string(),
  type: z.string(),
  osVersion: z.string(),
  appVersion: z.string(),
  packageName: z.string(),
  deviceId: z.number(),
  userId: z.number(),
});

export const PageResponseSchema = createPageResponseSchema(CeoDeviceResponseSchema);
