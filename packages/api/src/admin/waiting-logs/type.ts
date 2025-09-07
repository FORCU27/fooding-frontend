import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const AdminWaitingLogResponseSchema = z.object({
  id: z.number(),
  storeWaitingId: z.number(),
  type: z.string(),
});

export type AdminWaitingLogResponse = z.infer<typeof AdminWaitingLogResponseSchema>;

export const GetAdminWaitingLogListResponse = PageResponse(AdminWaitingLogResponseSchema);

