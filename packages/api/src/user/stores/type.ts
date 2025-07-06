import { z } from 'zod/v4';

import { ApiResponse, PageResponse, SortDirection, SortType } from '../../shared';

export const VISIT_PURPOSES = ['MEETING', 'DATE', 'FRIEND', 'FAMILY', 'BUSINESS', 'PARTY'] as const;
export type VisitPurpose = (typeof VISIT_PURPOSES)[number];

export const PARKING_TYPES = ['PAID', 'FREE'] as const;
export type ParkingType = (typeof PARKING_TYPES)[number];

export const PARKING_CHARGE_TYPES = ['HOURLY', 'FLAT_RATE'] as const;
export type ParkingChargeType = (typeof PARKING_CHARGE_TYPES)[number];

export const REGULAR_HOLIDAY_TYPES = ['WEEKLY', 'MONTHLY'] as const;
export type RegularHolidayType = (typeof REGULAR_HOLIDAY_TYPES)[number];

export const DAY_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;
export type DayOfWeek = (typeof DAY_OF_WEEK)[number];

export type Store = z.infer<typeof Store>;
export const Store = z.object({
  id: z.number(),
  name: z.string(),
  mainImage: z.string().nullable(),
  city: z.string(),
  visitCount: z.number(),
  reviewCount: z.number(),
  averageRating: z.number(),
  estimatedWaitingTimeMinutes: z.number().nullable(),
  isBookmarked: z.boolean(),
  isFinished: z.boolean(),
});

const StoreImage = z.object({
  id: z.number(),
  imageUrl: z.string(),
  sortOrder: z.number(),
  tags: z.array(z.string()).nullable(),
});

export type StoreInfo = z.infer<typeof StoreInfo>;
export const StoreInfo = Store.omit({ mainImage: true }).extend({
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(StoreImage),
});

export type GetStoreListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  sortType?: SortType;
  sortDirection?: SortDirection;
};

export type Review = z.infer<typeof Review>;
export const Review = z.object({
  reviewId: z.number(),
  nickname: z.string().nullable(),
  profileUrl: z.string().nullable(),
  imageUrls: z.string().array(),
  content: z.string(),
  score: z.object({
    total: z.number(),
    taste: z.number(),
    mood: z.number(),
    service: z.number(),
  }),
  purpose: z.string(),
  likeCount: z.number(),
  createdAt: z.iso.datetime({ local: true }),
  updatedAt: z.iso.datetime({ local: true }),
});

export type GetStoreReviewListRequest = {
  id: number;
  params: {
    sortType: SortType;
    sortDirection: SortDirection;
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
export const GetStoreImageListResponse = PageResponse(StoreImage);

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
export const GetStoreReviewListResponse = PageResponse(Review);

export type GetStoreOperatingHoursResponse = z.infer<typeof GetStoreOperatingHoursResponse>;
export const GetStoreOperatingHoursResponse = ApiResponse(
  z
    .object({
      id: z.number(),
      hasHoliday: z.boolean(),
      regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES).nullable(),
      regularHoliday: z.enum(DAY_OF_WEEK).nullable(),
      closedNationalHolidays: z.array(z.string()).nullable(),
      customHolidays: z.array(z.iso.date()).nullable(),
      operatingNotes: z.string().nullable(),
      dailyOperatingTimes: z.array(
        z.object({
          id: z.number(),
          dayOfWeek: z.enum(DAY_OF_WEEK),
          openTime: z.iso.time().nullable(),
          closeTime: z.iso.time().nullable(),
          breakStartTime: z.iso.time().nullable(),
          breakEndTime: z.iso.time().nullable(),
        }),
      ),
    })
    .nullable(),
);

export const GetStoreAdditionalInfoResponse = ApiResponse(
  z
    .object({
      id: z.number(),
      links: z.array(z.string()).nullable(),
      facilities: z.array(z.string()),
      paymentMethods: z.array(z.string()).nullable(),
      parkingAvailable: z.boolean(),
      parkingType: z.enum(PARKING_TYPES).nullable(),
      parkingChargeType: z.enum(PARKING_CHARGE_TYPES).nullable(),
      parkingBasicTimeMinutes: z.number().nullable(),
      parkingBasicFee: z.number().nullable(),
      parkingExtraMinutes: z.number().nullable(),
      parkingExtraFee: z.number().nullable(),
      parkingMaxDailyFee: z.number().nullable(),
    })
    .nullable(),
);

export type CreateStoreReviewBody = {
  storeId: number;
  userId: number;
  content: string;
  visitPurpose: VisitPurpose;
  total: number;
  taste: number;
  mood: number;
  service: number;
};
