import z from 'zod/v4';

import { ApiResponse } from '../shared';

export type FileUploadResponse = z.infer<typeof FileUploadResponse>;
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

export type UploadFile = z.infer<typeof UploadFile>;
export const UploadFile = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  url: z.string(),
});
