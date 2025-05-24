import { z } from 'zod';

import { createPageResponseSchema } from '../shared';

export const StoreSortType = {
  RECENT: 'RECENT',
} as const;

export type StoreSortType = (typeof StoreSortType)[keyof typeof StoreSortType];

export const SortDirection = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const AdminStoreResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const AdminCreateStoreRequestSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const AdminUpdateStoreRequestSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const PageResponseSchema = createPageResponseSchema(AdminStoreResponseSchema);

export type AdminStoreResponse = z.infer<typeof AdminStoreResponseSchema>;
export type AdminCreateStoreRequest = z.infer<typeof AdminCreateStoreRequestSchema>;
export type AdminUpdateStoreRequest = z.infer<typeof AdminUpdateStoreRequestSchema>;
