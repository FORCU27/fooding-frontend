import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const IMAGES_SORT_TYPES = ['RECENT', 'OLD'] as const;
export type ImagesSortType = (typeof IMAGES_SORT_TYPES)[number];

export const ImageTagEnum = {
  PRICE_TAG: 'PRICE_TAG',
  FOOD: 'FOOD',
  BEVERAGE: 'BEVERAGE',
  INTERIOR: 'INTERIOR',
  EXTERIOR: 'EXTERIOR',
} as const;

export type ImageTag = keyof typeof ImageTagEnum;

export type GetStoreImagesParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  tag?: ImageTag | null;
  isMain?: boolean;
  sortType?: ImagesSortType;
};

export type CreateStoreImageParams = {
  imageId: string;
  sortOrder?: number;
  tag?: ImageTag[];
};

export type PustStoreImageParams = {
  imageId?: string;
  sortOrder?: number;
  tags?: ImageTag[];
};

export type PutStoreMainImageParams = {
  isMain: boolean;
};

export const StoreImages = z.object({
  id: z.number(),
  imageUrl: z.string(),
  sortOrder: z.number().nullable(),
  tags: z.array(z.enum(ImageTagEnum)).nullable(),
  isMain: z.boolean(),
});

export const GetStoreImagesResponse = PageResponse(StoreImages);
export type GetStoreImagesResponse = z.infer<typeof GetStoreImagesResponse>;
