import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const AuthPhone = z.object({
  email: z.string(),
  phoneNumber: z.string(),
  code: z.number(),
  success: z.boolean(),
});

export type AuthPhone = z.infer<typeof AuthPhone>;

export const GetAuthVerifyPhoneResponse = ApiResponse(AuthPhone);
