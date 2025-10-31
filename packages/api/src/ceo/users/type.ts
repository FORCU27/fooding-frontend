import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImage: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  addressDetail: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const GetUsersResponse = PageResponse(UserResponseSchema);

export type GetUsersParams = {
  searchString: string;
  pageNum?: number;
  pageSize?: number;
};
