import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export type Store = z.infer<typeof Store>;
export const Store = z.object({
  id: z.number(),
  name: z.string(),
  mainImage: z.string().optional(),
  city: z.string(),
  visitCount: z.number(),
  reviewCount: z.number(),
  averageRating: z.number(),
  estimatedWaitingTimeMinutes: z.number().nullable(),
  //임의
  isBookMarded: z.boolean().optional(),
  isFinished: z.boolean().optional(),
});

export type StoreInfo = z.infer<typeof StoreInfo>;
export const StoreInfo = Store.extend({
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  images: z
    .object({
      id: z.number(),
      imageUrl: z.string(),
      sortOrder: z.number(),
      tags: z.string(), // "가,나,다"
    })
    .array(),
});

export type GetStoreListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  sortType?: string;
  sortDirection?: string;
};

export type GetStoreReviewListRequest = {
  id: number;
  params: {
    sortType: 'RECENT';
    sortDirection: 'DESCENDING';
  };
};

export type GetStoreImageListRequest = {
  id: number;
  params: {
    searchString: string;
    pageNum: number;
    pageSize: number;
    searchTag: string;
  };
};

export type GetStoreImageListResponse = z.infer<typeof GetStoreImageListResponse>;
export const GetStoreImageListResponse = PageResponse(
  z.object({
    id: z.number(),
    imageUrl: z.string(),
    sortOrder: z.number(),
    tags: z.string(), // "가,나,다"
  }),
);

export type GetStoreListResponse = z.infer<typeof GetStoreListResponse>;
export const GetStoreListResponse = PageResponse(Store);

export type GetStoreByIdResponse = z.infer<typeof GetStoreByIdResponse>;
export const GetStoreByIdResponse = ApiResponse(StoreInfo);

export type GetStoreMenuListResponse = z.infer<typeof GetStoreMenuListResponse>;
export const GetStoreMenuListResponse = ApiResponse(
  z.array(
    z.object({
      id: z.number(),
      categoryName: z.string(),
      menu: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          description: z.string(),
          imageUrl: z.string(),
          price: z.number(),
          sortOrder: z.number(),
          signature: z.boolean(),
          recommend: z.boolean(),
        }),
      ),
    }),
  ),
);

export type GetStoreReviewListResponse = z.infer<typeof GetStoreReviewListResponse>;
export const GetStoreReviewListResponse = PageResponse(
  z.object({
    reviewId: z.number(),
    nickname: z.string(),
    imageUrls: z.string(),
    content: z.string(),
    score: z.number(),
    purpose: z.string(),
    likeCount: z.number(),
    createdAt: z.iso.datetime({ local: true }),
    updatedAt: z.iso.datetime({ local: true }),
  }),
);

export type GetStoreOperatingHoursResponse = z.infer<typeof GetStoreOperatingHoursResponse>;
export const GetStoreOperatingHoursResponse = ApiResponse(
  z.object({
    id: z.number(),
    hasHoliday: z.boolean(),
    regularHolidayType: z.enum(['WEEKLY']),
    regularHoliday: z.enum(['MONDAY']),
    closedNationalHolidays: z.string(), // "[가,나,다]"
    customHolidays: z.string(), // "[YYYY-MM-DD, YYYY-MM-DD, YYYY-MM-DD]"
    operatingNotes: z.string(),
    dailyOperatingTimes: z.array(
      z.object({
        id: z.number(),
        dayOfWeek: z.enum(['MONDAY']),
        openTime: z.iso.time(),
        closeTime: z.iso.time(),
        breakStartTime: z.iso.time(),
        breakEndTime: z.iso.time(),
      }),
    ),
  }),
);

export const GetStoreAdditionalInfoResponse = ApiResponse(
  z.object({
    id: z.number(),
    links: z.string(), // "[가, 나, 다]"
    facilities: z.string(), // "[가, 나, 다]"
    paymentMethods: z.string(), // "[가, 나, 다]"
    parkingAvailable: z.boolean(),
    parkingType: z.enum(['PAID']),
    parkingChargeType: z.enum(['HOURLY']),
    parkingBasicTimeMinutes: z.number(),
    parkingBasicFee: z.number(),
    parkingExtraMinutes: z.number(),
    parkingExtraFee: z.number(),
    parkingMaxDailyFee: z.number(),
  }),
);

export type CreateStoreReviewBody = {
  storeId: number;
  userId: number;
  content: string;
  visitPurpose: 'MEETING';
  total: number;
  taste: number;
  mood: number;
  service: number;
};
