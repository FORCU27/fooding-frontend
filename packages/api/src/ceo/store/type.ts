import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

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

export type CreateStoreBody = {
  name: string;
};

export type CreateStorePointShopItemBody = {
  name: string;
  point: number;
  provideType: 'ALL' | 'REGULAR_CUSTOMER';
  conditions: string;
  totalQuantity: number;
  issueStartOn: string;
  issueEndOn: string;
};

export interface PointShopQuery {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  isActive?: boolean;
}

export const PointShop = z.object({
  id: z.number(),
  name: z.string(),
  point: z.number(),
  provideType: z.enum(['ALL', 'REGULAR_CUSTOMER']),
  conditions: z.string(),
  isActive: z.boolean(),
  totalQuantity: z.number(),
  issuedQuantity: z.number(),
  issueStartOn: z.string(),
  issueEndOn: z.string(),
});

export type PointShop = z.infer<typeof PointShop>;

export const SubwayStation = z.object({
  id: z.number(),
  name: z.string(),
  line: z.string(),
  address: z.string(),
});

export const Store = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  regionId: z.string().nullable(),
  address: z.string(),
  addressDetail: z.string().nullable(),
  category: z.enum([
    'PORK',
    'MEAT',
    'CHICKEN',
    'JAPANESE',
    'WESTERN',
    'CHINESE',
    'KOREAN',
    'ASIAN',
    'LUNCHBOX_PORRIDGE',
    'CAFE_DESSERT',
    'BURGER',
    'SALAD',
    'SNACK',
    'SEAFOOD',
    'SIDE_DISH',
  ]),
  description: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  visitCount: z.number(),
  reviewCount: z.number(),
  bookmarkCount: z.number(),
  stations: z.array(z.any()),
});

export type Store = z.infer<typeof Store>;

export const StoreOperatingHour = z.object({
  id: z.number(),
  hasHoliday: z.boolean(),
  regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES),
  regularHoliday: z.enum(DAY_OF_WEEK),
  closedNationalHolidays: z.string().array(),
  customHolidays: z.string().array(),
  operatingNotes: z.string(),
  dailyOperatingTimes: z.object({
    dayOfWeek: z.enum(DAY_OF_WEEK),
    openTime: z.string(),
    closeTime: z.string(),
    breakStartTime: z.string(),
    breakEndTime: z.string(),
  }),
});

export const StoreOperatingHourBody = z.object({
  hasHoliday: z.boolean(),
  regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES),
  regularHoliday: z.enum(DAY_OF_WEEK).array(),
  closedNationalHolidays: z.string().array(),
  customHolidays: z.string().array(),
  operatingNotes: z.string(),
  dailyOperatingTimes: z.array(
    z.object({
      dayOfWeek: z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ]),
      openTime: z.string(),
      closeTime: z.string(),
      breakStartTime: z.string(),
      breakEndTime: z.string(),
    }),
  ),
});

export const GetStoreOperatingHourResponse = ApiResponse(StoreOperatingHour);

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;

export type StoreOperatingHourBody = z.infer<typeof StoreOperatingHourBody>;

export const GetStorePointShopResponse = ApiResponse(PointShop);
export const GetStorePointShopListResponse = z.object({
  status: z.string().nullable(),
  data: z.object({
    list: z.array(PointShop),
    pageInfo: z.object({
      pageNum: z.number(),
      pageSize: z.number(),
      totalCount: z.number(),
      totalPages: z.number(),
    }),
  }),
});
export type GetStorePointShopStatusResponse = z.infer<typeof GetStorePointShopStatusResponse>;
export const GetStorePointShopStatusResponse = z.object({
  status: z.string(),
  data: z.object({}),
});

export type CreateStorePointShopResponse = z.infer<typeof CreateStorePointShopResponse>;
export const CreateStorePointShopResponse = z.object({
  status: z.string(),
  data: z.number(),
});
export type UpdateStoreBody = {
  name: Store['name'];
  regionId: Store['regionId'];
  address: Store['address'];
  addressDetail: Store['addressDetail'];
  category: Store['category'];
  description: Store['description'];
  contactNumber: Store['contactNumber'];
  direction: Store['direction'];
  latitude: Store['latitude'];
  longitude: Store['longitude'];
};
