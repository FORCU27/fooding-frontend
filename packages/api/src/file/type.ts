import z from 'zod/v4';

import { ApiResponse } from '../shared';

export const FileUploadResponse = ApiResponse(
  z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.number(),
      url: z.string(),
    }),
  ),
);
