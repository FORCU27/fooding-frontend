import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const AuthPhone = z.object({
  email: z.string(),
  phoneNumber: z.string(),
  code: z.number(),
  success: z.boolean(),
});

export type AuthPhone = z.infer<typeof AuthPhone>;

export const FindEmailResult = z.object({
  email: z.string(),
});
export type FindEmailResult = z.infer<typeof FindEmailResult>;

export const GetFindEmailResponse = ApiResponse(FindEmailResult);

export const GetAuthVerifyPhoneResponse = ApiResponse(AuthPhone);
